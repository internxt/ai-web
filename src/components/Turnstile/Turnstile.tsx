import { useEffect, useRef } from 'react';
import { setTurnstileToken } from '../../services/turnstile';

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
        },
      ) => string;
      remove: (id: string) => void;
    };
  }
}

interface TurnstileProps {
  onVerify?: (token: string) => void;
}

const Turnstile: React.FC<TurnstileProps> = ({ onVerify }) => {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;

  useEffect(() => {
    let cancelled = false;

    const tryRender = () => {
      if (cancelled) return;

      if (window.turnstile && ref.current && widgetId.current === null) {
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: SITE_KEY,
          callback: (token) => {
            setTurnstileToken(token);
            onVerifyRef.current?.(token);
          },
          'expired-callback': () => setTurnstileToken(null),
          'error-callback': () => setTurnstileToken(null),
        });
      } else if (!window.turnstile) {
        setTimeout(tryRender, 200);
      }
    };

    tryRender();

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
      setTurnstileToken(null);
    };
  }, []);

  return <div ref={ref} className="flex justify-center" />;
};

export default Turnstile;
