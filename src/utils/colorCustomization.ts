// Color customization utility for dynamic theme changes
// Utilizatorii pot folosi această funcție pentru a schimba culorile temei

export interface ThemeColors {
  primary?: string;
  accent?: string;
  success?: string;
  warning?: string;
  info?: string;
}

export interface StatusColors {
  active?: string;
  progress?: string;
  hold?: string;
  blocked?: string;
}

export interface PriorityColors {
  low?: string;
  medium?: string;
  high?: string;
  critical?: string;
}

/**
 * Schimbă culorile personalizate ale temei
 * @param colors - Obiect cu culorile în format HSL (ex: "142.1 76.2% 36.3%")
 */
export const setCustomThemeColors = (colors: ThemeColors) => {
  const root = document.documentElement;

  if (colors.primary) {
    root.style.setProperty("--theme-custom-primary", colors.primary);
  }
  if (colors.accent) {
    root.style.setProperty("--theme-custom-accent", colors.accent);
  }
  if (colors.success) {
    root.style.setProperty("--theme-custom-success", colors.success);
  }
  if (colors.warning) {
    root.style.setProperty("--theme-custom-warning", colors.warning);
  }
  if (colors.info) {
    root.style.setProperty("--theme-custom-info", colors.info);
  }
};

/**
 * Schimbă culorile pentru statusuri
 */
export const setStatusColors = (colors: StatusColors) => {
  const root = document.documentElement;

  if (colors.active) {
    root.style.setProperty("--status-active", colors.active);
  }
  if (colors.progress) {
    root.style.setProperty("--status-progress", colors.progress);
  }
  if (colors.hold) {
    root.style.setProperty("--status-hold", colors.hold);
  }
  if (colors.blocked) {
    root.style.setProperty("--status-blocked", colors.blocked);
  }
};

/**
 * Schimbă culorile pentru priorități
 */
export const setPriorityColors = (colors: PriorityColors) => {
  const root = document.documentElement;

  if (colors.low) {
    root.style.setProperty("--priority-low", colors.low);
  }
  if (colors.medium) {
    root.style.setProperty("--priority-medium", colors.medium);
  }
  if (colors.high) {
    root.style.setProperty("--priority-high", colors.high);
  }
  if (colors.critical) {
    root.style.setProperty("--priority-critical", colors.critical);
  }
};

/**
 * Resetează culorile la valorile default
 */
export const resetToDefaultColors = () => {
  const root = document.documentElement;

  // Reset theme colors to CSS variable defaults
  root.style.removeProperty("--theme-custom-primary");
  root.style.removeProperty("--theme-custom-accent");
  root.style.removeProperty("--theme-custom-success");
  root.style.removeProperty("--theme-custom-warning");
  root.style.removeProperty("--theme-custom-info");

  // Reset status colors
  root.style.removeProperty("--status-active");
  root.style.removeProperty("--status-progress");
  root.style.removeProperty("--status-hold");
  root.style.removeProperty("--status-blocked");

  // Reset priority colors
  root.style.removeProperty("--priority-low");
  root.style.removeProperty("--priority-medium");
  root.style.removeProperty("--priority-high");
  root.style.removeProperty("--priority-critical");
};

// Culori predefinite pentru diferite teme
export const colorPresets = {
  default: {
    primary: "231 48% 56%", // Mov
    accent: "220 14.3% 95.9%",
    success: "142.1 76.2% 36.3%", // Verde
    warning: "32.2 94.6% 43.7%", // Portocaliu
    info: "221.2 83.2% 53.3%", // Albastru
  },
  green: {
    primary: "142.1 76.2% 36.3%", // Verde ca primar
    accent: "220 14.3% 95.9%",
    success: "142.1 85% 45%",
    warning: "32.2 94.6% 43.7%",
    info: "221.2 83.2% 53.3%",
  },
  blue: {
    primary: "221.2 83.2% 53.3%", // Albastru ca primar
    accent: "220 14.3% 95.9%",
    success: "142.1 76.2% 36.3%",
    warning: "32.2 94.6% 43.7%",
    info: "221.2 90% 60%",
  },
  red: {
    primary: "0 84.2% 60.2%", // Roșu ca primar
    accent: "220 14.3% 95.9%",
    success: "142.1 76.2% 36.3%",
    warning: "32.2 94.6% 43.7%",
    info: "221.2 83.2% 53.3%",
  },
  orange: {
    primary: "32.2 94.6% 43.7%", // Portocaliu ca primar
    accent: "220 14.3% 95.9%",
    success: "142.1 76.2% 36.3%",
    warning: "45 100% 51%",
    info: "221.2 83.2% 53.3%",
  },
  pink: {
    primary: "330 68% 68%", // Roz
    accent: "330 68% 95%",
    success: "142.1 76.2% 36.3%",
    warning: "32.2 94.6% 43.7%",
    info: "221.2 83.2% 53.3%",
  },
  teal: {
    primary: "180 100% 35%", // Teal
    accent: "180 100% 90%",
    success: "142.1 76.2% 36.3%",
    warning: "32.2 94.6% 43.7%",
    info: "221.2 83.2% 53.3%",
  },
  indigo: {
    primary: "230 70% 50%", // Indigo
    accent: "230 70% 95%",
    success: "142.1 76.2% 36.3%",
    warning: "32.2 94.6% 43.7%",
    info: "221.2 83.2% 53.3%",
  },
  amber: {
    primary: "45 100% 50%", // Ambră
    accent: "45 100% 95%",
    success: "142.1 76.2% 36.3%",
    warning: "32.2 94.6% 43.7%",
    info: "221.2 83.2% 53.3%",
  },
  modern: {
    primary: "231 48% 56%", // Lavender (#B39CD0)
    accent: "182 43% 76%", // Light Cyan (#A8DADC)
    success: "142.1 76.2% 36.3%",
    warning: "349 100% 88%", // Soft Pink (#FFC1CC)
    info: "221.2 83.2% 53.3%",
  },
};

/**
 * Aplică un preset de culori predefinit
 */
export const applyColorPreset = (presetName: keyof typeof colorPresets) => {
  const preset = colorPresets[presetName];
  if (preset) {
    setCustomThemeColors(preset);
  }
};
