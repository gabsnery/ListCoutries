import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageBar = (props) => {
  const { i18n } = useTranslation();
  return (
    <div style={{ width: "fit-content", display: "inline" }}>
      <Button onClick={() => i18n.changeLanguage("pt")}>Português</Button>
      <Button onClick={() => i18n.changeLanguage("en")}>English</Button>
    </div>
  );
};

export default LanguageBar;
