// src/components/Editor/extentions/FontFamily.ts

import { Extension, RawCommands } from '@tiptap/core';
import TextStyle from '@tiptap/extension-text-style';


// Augment Tiptap’s Commands interface so our custom command is recognized
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
      fontFamily: {
        setFontFamily: (font: string) => ReturnType;
      }
    }
  }

  const FontFamily = Extension.create({
    name: 'fontFamily',
  
    addGlobalAttributes() {
      return [
        {
          types: ['textStyle'],
          attributes: {
            fontFamily: {
              default: null,
              parseHTML: (element) =>
                element.style.fontFamily.replace(/['"]/g, '') || null,
              renderHTML: (attributes) => {
                if (!attributes.fontFamily) {
                  return {};
                }
                return { style: `font-family: ${attributes.fontFamily}` };
              },
            },
          },
        },
      ];
    },
  
    addCommands() {
        return {
          setFontFamily: (font: string) => ({ chain }) => {
            return chain().setMark('textStyle', { fontFamily: font }).run();
          },
        } as Partial<RawCommands>;
      },
    });
  
  export default FontFamily;