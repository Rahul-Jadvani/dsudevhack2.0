
import React from 'react';
import { X } from "lucide-react";

const CloseButton = () => {
  return (
    <button className="close-btn w-10 h-10 flex items-center justify-center rounded-none">
      <X className="w-6 h-6 text-white" />
    </button>
  );
};

export default CloseButton;
