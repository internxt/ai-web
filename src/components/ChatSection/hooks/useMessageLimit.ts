import { useState, useCallback } from 'react';

const STORAGE_KEY = 'internxt-ai-usage';
const DAILY_LIMIT = 40;

interface UsageData {
  count: number;
  date: string;
}

function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

function getUsageData(): UsageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { count: 0, date: getTodayKey() };
    const data = JSON.parse(raw) as UsageData;
    if (data.date !== getTodayKey()) {
      return { count: 0, date: getTodayKey() };
    }
    return data;
  } catch {
    return { count: 0, date: getTodayKey() };
  }
}

export function useMessageLimit() {
  const [usage, setUsage] = useState<UsageData>(getUsageData);

  const isLimitReached = usage.count >= DAILY_LIMIT;

  const incrementCount = useCallback(() => {
    const today = getTodayKey();
    const current = getUsageData();
    const newUsage: UsageData = { count: current.count + 1, date: today };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsage));
    setUsage(newUsage);
  }, []);

  return { messageCount: usage.count, isLimitReached, incrementCount };
}
