"use client";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";

function Providers({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export default Providers;
