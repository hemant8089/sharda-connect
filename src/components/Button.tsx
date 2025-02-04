//src/components/Button.tsx
import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "landing" | "default"; // Variant prop for different styles
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "default",
}) => {
  const baseStyles =
    "px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition duration-300 ease-in-out";

  const styles = {
    landing:
      "bg-white text-lg font-medium text-blue-600 hover:bg-yellow-300 hover:text-black",
    default:
      "w-full py-3 text-lg font-medium bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-900 transition",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${styles[variant]}`}>
      {text}
    </button>
  );
};
