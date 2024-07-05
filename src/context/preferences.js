import React, { createContext, useState } from 'react';

export const PreferencesContext = createContext({});

export default function PreferencesProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <PreferencesContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </PreferencesContext.Provider>
  );
}
