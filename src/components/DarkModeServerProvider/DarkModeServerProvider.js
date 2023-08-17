import React from 'react';
import DarkModeProvider from "@/components/DarkModeProvider";
import {cookies} from "next/headers";

async function DarkModeServerProvider({...delegated}) {
  const raw = cookies().get("darkMode");
  const darkMode = JSON.parse(raw.value ?? false);

  return <DarkModeProvider {...delegated} initialDarkMode={darkMode}></DarkModeProvider>;
}

export default DarkModeServerProvider;
