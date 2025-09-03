// src/components/common/useToast.js
import { useState } from "react";

export const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const addToast = (toast) => {
    setToasts((currentToasts) => [...currentToasts, toast]);
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((t) => t !== toast));
    }, 5000);
  };
  return { toasts, toast: addToast };
};
