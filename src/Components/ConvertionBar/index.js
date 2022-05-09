import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useData } from "../../Context/DataContext";

const LanguageBar = (props) => {
  const { setConvertValue } = useData();
  const [Input, setInput] = useState("");
  const { t } = useTranslation();
  return (
    <div
      style={{ width: "100%", display: "inline-flex", justifyContent: "right" }}
    >
      <TextField
        id="outlined-basic"
        label={t("SEKValue")}
        size="small"
        variant="standard"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        sx={{ marginLeft: "10px" }}
        variant="outlined"
        size="small"
        onClick={() => setConvertValue({ Value: Input })}
      >
        {t("Convert")}
      </Button>
    </div>
  );
};

export default LanguageBar;
