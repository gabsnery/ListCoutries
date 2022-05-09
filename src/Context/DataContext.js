import React, { createContext, useContext, useState } from "react";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [ConvertValue, setConvertValue] = useState({ Value: 0, From: "SEK" });
  return (
    <DataContext.Provider
      value={{
        ConvertValue,
        setConvertValue
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  const { ConvertValue, setConvertValue } = context;
  return {
    ConvertValue,
    setConvertValue
  };
}
