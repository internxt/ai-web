import { useState, useCallback } from 'react';

const STORAGE_KEY = 'internxt-ai-usage';
const DAILY_LIMIT = 40;
const PASSPHRASE = import.meta.env.VITE_USAGE_PASSPHRASE as string;

interface UsageData {
  count: number;
  date: string;
}

function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

async function getDerivedKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(PASSPHRASE),
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: enc.encode(STORAGE_KEY), iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

async function encryptData(data: UsageData): Promise<string> {
  const key = await getDerivedKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(data));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  const combined = new Uint8Array(iv.byteLength + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.byteLength);
  return btoa(String.fromCharCode(...combined));
}

async function decryptData(raw: string): Promise<UsageData | null> {
  try {
    const key = await getDerivedKey();
    const combined = Uint8Array.from(atob(raw), (c) => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);
    const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
    return JSON.parse(new TextDecoder().decode(plaintext)) as UsageData;
  } catch {
    return null;
  }
}

async function getUsageData(): Promise<UsageData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { count: 0, date: getTodayKey() };
    const data = await decryptData(raw);
    if (!data || data.date !== getTodayKey()) {
      return { count: 0, date: getTodayKey() };
    }
    return data;
  } catch {
    return { count: 0, date: getTodayKey() };
  }
}

async function saveUsageData(data: UsageData): Promise<void> {
  const encrypted = await encryptData(data);
  localStorage.setItem(STORAGE_KEY, encrypted);
}

export function useMessageLimit() {
  const [usage, setUsage] = useState<UsageData>({ count: 0, date: getTodayKey() });
  const [initialized, setInitialized] = useState(false);

  const initialize = useCallback(async () => {
    if (initialized) return;
    const data = await getUsageData();
    setUsage(data);
    setInitialized(true);
  }, [initialized]);

  if (!initialized) {
    initialize();
  }

  const isLimitReached = usage.count >= DAILY_LIMIT;

  const incrementCount = useCallback(async () => {
    const current = await getUsageData();
    const newUsage: UsageData = { count: current.count + 1, date: getTodayKey() };
    await saveUsageData(newUsage);
    setUsage(newUsage);
  }, []);

  return { messageCount: usage.count, isLimitReached, incrementCount };
}
