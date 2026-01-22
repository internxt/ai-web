import { useMemo } from 'react';
import logoTelefonica from '../assets/images/Telefonica_logo.webp';
import logoInternxt from '../assets/images/logo_dark.svg';

export const useHostConfig = () => {
  const hostname = window.location.hostname;
  const params = new URLSearchParams(window.location.search);
  const brandParam = params.get('brand');
  
  const config = useMemo(() => {
    const isTelefonica = 
      hostname.includes('telefonica') || 
      brandParam === 'telefonica';
    
    return {
      isTelefonica,
      model: isTelefonica ? '120' : 'default-model',
      assets: {
        brandName: isTelefonica ? 'Telefónica' : 'Internxt',
        logo: isTelefonica ? logoTelefonica : logoInternxt,
      }
    };
  }, [hostname, brandParam]);
  
  return config;
};