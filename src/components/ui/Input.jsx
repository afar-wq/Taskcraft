import React, { forwardRef, useId } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  className = '', 
  ...props 
}, ref) => {
  // Génère un ID unique lié au composant pour l'accessibilité (accessibilité du label)
  const generatedId = useId();

  return (
    <div className="w-full flex flex-col gap-1.5 mb-4">
      {/* Label (si fourni) */}
      {label && (
        <label 
          htmlFor={generatedId} 
          className="text-sm font-semibold text-gray-700 cursor-pointer"
        >
          {label}
        </label>
      )}

      {/* Input HTML */}
      <input
        id={generatedId}
        type={type}
        ref={ref}
        className={`
          w-full px-3 py-2 text-sm bg-white border rounded-xl 
          placeholder-gray-400 text-gray-800 transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-0
          ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
          }
          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />

      {/* Message d'erreur (si fourni) */}
      {error && (
        <span className="text-xs font-medium text-red-600 animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
});

// Optionnel mais recommandé pour le débogage dans les DevTools React quand on utilise forwardRef
Input.displayName = 'Input';

export default Input;