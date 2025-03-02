// src/components/Editor/ToolBar.tsx

"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import FontDropdown from "@/components/Editor/FontDropdown";
import UploadModal from "./UploadModal";
import {
  Heading1,
  Heading2,
  Heading3,
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Upload,
  List,
  ListOrdered,
} from "lucide-react";

interface ToolBarProps {
  editor: Editor | null;
}

const ToolBar: React.FC<ToolBarProps> = ({ editor }) => {
const [uploadModalOpen, setUploadModalOpen] = useState(false);
  if (!editor) return null;

//   const addImage = () => {
//     const url = window.prompt("URL");
//     if (url) {
//       editor.chain().focus().setImage({ src: url }).run();
//     }
//   };

  const handleFontChange = (font: string) => {
    editor.chain().focus().setFontFamily(font).run();
  };


  const headingOptions = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => {
        if (editor.isActive("heading", { level: 1 })) {
          editor.chain().focus().setParagraph().run();
        } else {
          editor.chain().focus().setHeading({ level: 1 }).run();
        }
      },
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => {
        if (editor.isActive("heading", { level: 2 })) {
          editor.chain().focus().setParagraph().run();
        } else {
          editor.chain().focus().setHeading({ level: 2 }).run();
        }
      },
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => {
        if (editor.isActive("heading", { level: 3 })) {
          editor.chain().focus().setParagraph().run();
        } else {
          editor.chain().focus().setHeading({ level: 3 }).run();
        }
      },
      pressed: editor.isActive("heading", { level: 3 }),
    },
  ];

  const otherOptions = [
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      pressed: editor.isActive("code"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <Upload className="size-4" />,
      onClick: () => setUploadModalOpen(true),
      pressed: false,
    },
  ];

//   return (
//     <div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky top-10 z-50 flex flex-wrap items-center">
//       {headingOptions.map((option, i) => (
//         <Toggle
//           key={i}
//           size="sm"
//           pressed={option.pressed}
//           onPressedChange={option.onClick}
//         >
//           {option.icon}
//         </Toggle>
//       ))}

//       {/* Insert the Font Dropdown after headings */}
//       <FontDropdown onFontChange={handleFontChange} />

//       {otherOptions.map((option, i) => (
//         <Toggle
//           key={i + headingOptions.length}
//           size="sm"
//           pressed={option.pressed}
//           onPressedChange={option.onClick}
//         >
//           {option.icon}
//         </Toggle>
//       ))}
//     </div>
//   );
// };

// export default ToolBar;

return (
    <div className="relative">
      <div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky top-10 z-50 flex flex-wrap items-center">
        {headingOptions.map((option, i) => (
          <Toggle
            key={i}
            size="sm"
            pressed={option.pressed}
            onPressedChange={option.onClick}
          >
            {option.icon}
          </Toggle>
        ))}
        {/* Font dropdown */}
        <FontDropdown onFontChange={handleFontChange} />
        {otherOptions.map((option, i) => (
          <Toggle
            key={i + headingOptions.length}
            size="sm"
            pressed={option.pressed}
            onPressedChange={option.onClick}
          >
            {option.icon}
          </Toggle>
        ))}
      </div>
      {uploadModalOpen && (
        <UploadModal
          onClose={() => setUploadModalOpen(false)}
          onUploadUrl={(url: string) => {
            editor.chain().focus().setImage({ src: url }).run();
          }}
          onSelectFile={(file: File) => {
            const objectUrl = URL.createObjectURL(file);
            editor.chain().focus().setImage({ src: objectUrl }).run();
          }}
        />
      )}
    </div>
  );
};

export default ToolBar;
