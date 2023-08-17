"use client";
import React from 'react';
import {DARK_TOKENS, LIGHT_TOKENS} from "@/constants";
import Cookies from 'js-cookie';

export const DarkModeContext = React.createContext({
    darkMode: false, toggleDarkMode: () => {
    },
});

function DarkModeProvider({initialDarkMode = false, ...delegated}) {
    const [darkMode, setDarkMode] = React.useState(initialDarkMode);

    const toggleDarkMode = React.useCallback(function toggleDarkMode() {
        setDarkMode(d => !d);
    }, []);

    React.useEffect(() => {
        Cookies.set("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    return <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
        <html data-color-theme={darkMode ? "dark" : "light"}
              {...delegated}
              style={{
                  ...!darkMode ? LIGHT_TOKENS : DARK_TOKENS,
                  ...delegated.style
              }}/>
    </DarkModeContext.Provider>;
}

export default DarkModeProvider;
