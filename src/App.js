import React from "react";
import "./styles.css";
import Countries from "./Components/Countries";
import LanguageBar from "./Components/LanguageBar";
import ConvertionBar from "./Components/ConvertionBar";
import "./i18n";
import DataProvider from "./Context/DataContext";

export default function App() {
  return (
    <DataProvider>
      <div className="App">
        <LanguageBar />
        <ConvertionBar />
        <Countries />
      </div>
    </DataProvider>
  );
}
