import { az, en, ru } from "@/data/translates";
import { getCookie } from "@/app/helpers/cookies";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const languageResources: Record<string, {translation: typeof az}> = {
  az: {
    translation: az,
  },
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

i18n.use(initReactI18next).init({
  resources: languageResources,
  lng: getCookie("lcl") || "az",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
