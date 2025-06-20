"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  photographerName: string;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, photographerName }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError("All fields are required.");
      return;
    }
    alert(`Inquiry sent to ${photographerName}!\nFrom: ${name} (${email})\n\nMessage: ${message}`);
    onClose();
    setName("");
    setEmail("");
    setMessage("");
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={onClose} aria-label="Close modal">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-white">Send Inquiry to {photographerName}</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-label="Your Name"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Your Email"
          />
          <textarea
            placeholder="Message"
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            aria-label="Message"
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;
