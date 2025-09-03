import { useEffect, useState } from 'react';
import { setCustomThemeColors, resetToDefaultColors } from '@/utils/colorCustomization';

export function useCustomColors() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    // Load saved colors from localStorage on app startup
    const savedColors = localStorage.getItem('customThemeColors');
    if (savedColors) {
      try {
        const colors = JSON.parse(savedColors);
        setCustomThemeColors(colors);
      } catch (error) {
        console.error('Failed to load saved theme colors:', error);
      }
    }

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const applyColors = (colors: Record<string, string>) => {
    setCustomThemeColors(colors);
    localStorage.setItem('customThemeColors', JSON.stringify(colors));
  };

  const resetColors = () => {
    resetToDefaultColors();
    localStorage.removeItem('customThemeColors');
  };

  return {
    isDark,
    applyColors,
    resetColors
  };
}