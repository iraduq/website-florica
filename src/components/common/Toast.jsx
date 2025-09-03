// src/components/common/Toast.js
import React, { useState, useEffect } from "react";

const Toast = ({ title, description, variant }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const colorClass =
    variant === "destructive"
      ? "bg-theme-custom-warning text-white" // Modificat: folosește culoarea "warning"
      : "bg-theme-custom-success text-white"; // Modificat: folosește culoarea "success"

  return isVisible ? (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-[100] transition-transform transform ${colorClass} animate-slideIn`}
    >
      <div className="font-bold">{title}</div>
      <div className="text-sm">{description}</div>
    </div>
  ) : null;
};

export const ToastContainer = ({ toasts }) => (
  <div className="fixed bottom-4 right-4 z-[100] flex flex-col space-y-2">
    {toasts.map((toast, index) => (
      <Toast key={index} {...toast} />
    ))}
  </div>
);
