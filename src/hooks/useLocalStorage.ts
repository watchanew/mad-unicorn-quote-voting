'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize state with a function to avoid SSR issues
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item, (key, value) => {
        // Handle Date objects
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
          return new Date(value);
        }
        return value;
      }) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Dispatch a custom event to notify other components/pages
        window.dispatchEvent(new CustomEvent('localStorageChange', {
          detail: { key, value: valueToStore }
        }));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes from other components/pages
  useEffect(() => {
    const handleStorageChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value);
      }
    };

    const handleLocalStorageChange = handleStorageChange as EventListener;
    
    if (typeof window !== 'undefined') {
      window.addEventListener('localStorageChange', handleLocalStorageChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('localStorageChange', handleLocalStorageChange);
      }
    };
  }, [key]);

  return [storedValue, setValue] as const;
}