// src/components/common/Dialog.js
import React from "react";
import { CloseIcon } from "../common/Icons";

const Dialog = ({ isOpen, onClose, title, children }) => {
  const handleDialogClick = (e) => {
    // Prevent closing the dialog when clicking inside it
    e.stopPropagation();
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={onClose} // Closes dialog when clicking outside
    >
      <div
        className="relative w-full max-w-lg mx-auto mt-16 bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 sm:p-8 transform transition-transform duration-300 scale-100"
        onClick={handleDialogClick}
      >
        <div className="flex justify-between items-center mb-4 border-b border-zinc-100 dark:border-zinc-700 pb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            // Modifică clasele text-color pentru a folosi culorile primare
            className="p-2 rounded-full text-zinc-500 hover:text-theme-custom-primary dark:text-zinc-400 dark:hover:text-theme-custom-primary transition-colors"
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
