// src/components/Editor/FontDropdown.tsx

"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const fonts = [
  "Times New Roman",
  "Arial",
  "Helvetica",
  "Courier New",
  "Georgia",
  "Verdana",
];

interface FontDropdownProps {
  onFontChange: (font: string) => void;
}

export default function FontDropdown({ onFontChange }: FontDropdownProps) {
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFontSelect = (font: string) => {
    setSelectedFont(font);
    setIsOpen(false);
    onFontChange(font);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium hover:bg-gray-50 focus:outline-none"
      >
        {selectedFont}
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {fonts.map((font) => (
              <button
                key={font}
                onClick={() => handleFontSelect(font)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {font}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
