import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "./lang/pt.json";
import en from "./lang/en.json";
import swe from "./lang/swe.json";

i18n.use(initReactI18next).init({
  resources: {
    pt: {
      translation: pt
    },
    en: {
      translation: en
    },
    swe: {
      translation: swe
    }
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
