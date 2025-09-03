import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  setCustomThemeColors,
  resetToDefaultColors,
  applyColorPreset,
  colorPresets,
} from "@/utils/colorCustomization";
import { useCustomColors } from "@/hooks/useCustomColors";
import { Palette, RotateCcw, Check } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility for class merging

// Your existing hexToHsl function
const hexToHsl = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number,
    s: number,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export function ColorCustomization() {
  const { applyColors, resetColors } = useCustomColors();
  const [customColors, setCustomColors] = useState({
    primary: "",
    accent: "",
    success: "",
    warning: "",
    info: "",
  });

  const handleColorChange = (colorType: string, value: string) => {
    setCustomColors((prev) => ({
      ...prev,
      [colorType]: value,
    }));
  };

  const applyCustomColors = () => {
    const hslColors: any = {};
    Object.entries(customColors).forEach(([key, hexValue]) => {
      if (hexValue) {
        const hsl = hexToHsl(hexValue);
        hslColors[key] = `${hsl.h} ${hsl.s}% ${hsl.l}%`;
      }
    });

    applyColors(hslColors);
  };

  const resetColorSystem = () => {
    resetColors();
    setCustomColors({
      primary: "",
      accent: "",
      success: "",
      warning: "",
      info: "",
    });
  };

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 bg-dashboard-bg min-h-screen">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Palette className="h-6 w-6 sm:h-7 sm:w-7 text-theme-custom-primary" />
            Color Customization
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Personalizează culorile aplicației pentru a se potrivi brandului
            tău.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Color Presets */}
          <Card className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Presets Predefinite
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Selectează o temă de culori predefinită
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 sm:gap-3">
                {Object.entries(colorPresets).map(([presetName, colors]) => (
                  <Button
                    key={presetName}
                    variant="outline"
                    onClick={() =>
                      applyColorPreset(presetName as keyof typeof colorPresets)
                    }
                    className="justify-start h-auto p-3 hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex gap-1">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: `hsl(${colors.primary})` }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: `hsl(${colors.success})` }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: `hsl(${colors.info})` }}
                        />
                      </div>
                      <span className="capitalize text-sm">{presetName}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Colors */}
          <Card className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Culori Personalizate
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Setează culori personalizate pentru elementele UI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    key: "primary",
                    label: "Primară",
                    description: "Culoarea principală a brandului",
                  },
                  {
                    key: "success",
                    label: "Succes",
                    description: "Pentru statusuri pozitive",
                  },
                  {
                    key: "warning",
                    label: "Avertisment",
                    description: "Pentru atenționări",
                  },
                  {
                    key: "info",
                    label: "Informație",
                    description: "Pentru informații generale",
                  },
                  {
                    key: "accent",
                    label: "Accent",
                    description: "Pentru elemente secundare",
                  },
                ].map((color) => (
                  <div key={color.key} className="space-y-2">
                    <Label
                      htmlFor={color.key}
                      className="text-xs sm:text-sm font-medium"
                    >
                      {color.label}
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id={color.key}
                        type="color"
                        value={
                          customColors[color.key as keyof typeof customColors]
                        }
                        onChange={(e) =>
                          handleColorChange(color.key, e.target.value)
                        }
                        className="w-12 h-8 p-1 rounded cursor-pointer"
                      />
                      <Input
                        type="text"
                        placeholder="#000000"
                        value={
                          customColors[color.key as keyof typeof customColors]
                        }
                        onChange={(e) =>
                          handleColorChange(color.key, e.target.value)
                        }
                        className="flex-1 text-sm"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {color.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button onClick={applyCustomColors} className="flex-1 text-sm">
                  <Check className="w-4 h-4 mr-2" />
                  Aplică Culorile
                </Button>
                <Button
                  variant="outline"
                  onClick={resetColorSystem}
                  className="flex-1 text-sm"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Preview</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Previzualizează cum arată culorile în diferite componente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Button className="w-full text-sm">Primary Button</Button>
                <Badge className="bg-theme-custom-primary text-primary-foreground">
                  Primary Badge
                </Badge>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full text-theme-custom-success border-theme-custom-success text-sm"
                >
                  Success Button
                </Button>
                <Badge className="bg-theme-custom-success text-white">
                  Success Badge
                </Badge>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full text-theme-custom-warning border-theme-custom-warning text-sm"
                >
                  Warning Button
                </Button>
                <Badge className="bg-theme-custom-warning text-white">
                  Warning Badge
                </Badge>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full text-theme-custom-info border-theme-custom-info text-sm"
                >
                  Info Button
                </Button>
                <Badge className="bg-theme-custom-info text-white">
                  Info Badge
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
