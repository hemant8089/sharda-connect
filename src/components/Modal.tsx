"use client";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blurred Background */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative z-10">
        {children}
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}
