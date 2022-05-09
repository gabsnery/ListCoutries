import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useData } from "../../Context/DataContext";

const ConvertionBar = () => {
  const { setConvertValue } = useData();
  const [Input, setInput] = useState("");
  const { t } = useTranslation();
  return (
    <div style={{ width: "fit-content", display: "inline" }}>
      <TextField
        id="outlined-basic"
        label={t("SEKValue")}
        size="small"
        variant="standard"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={() => setConvertValue({ Value: Input })}>
        {t("Convert")}
      </Button>
    </div>
  );
};

export default ConvertionBar;
