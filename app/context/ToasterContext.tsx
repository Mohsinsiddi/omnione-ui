"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

interface ToasterContextProps {}

const ToasterContext: React.FC<ToasterContextProps> = () => {
  return <Toaster />;
};

export default ToasterContext;
