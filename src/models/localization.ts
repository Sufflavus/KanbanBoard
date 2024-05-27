import common_en from "../translations/en/common.json";
import common_ru from "../translations/ru/common.json";

const LanguageKeys = {
    en: 'en',
    ru: 'ru'
};

export interface Language {
    key: string;
    isDefault: boolean;
}

export const SupportedLanguages: Language[] = [
    { 
        key: LanguageKeys.en,
        isDefault: true,
    },
    {
        key: LanguageKeys.ru,
        isDefault: false
    }
];

export const DefaultLanguageKey = SupportedLanguages.find(language => language.isDefault)?.key || LanguageKeys.en;

export const I18nextResources = {
    en: {
        common: common_en
    },
    ru: {
        common: common_ru
    }
};

// https://mui.com/x/react-date-pickers/adapters-locale/#custom-formats