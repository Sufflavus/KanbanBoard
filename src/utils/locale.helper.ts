import moment from 'moment';
import 'moment/locale/ru';
import { DefaultLanguageKey } from "../models";

export const setLocale = (localeKey: string) => {
    moment.locale(localeKey);
};

export const localeSetup = () => {
    setLocale(DefaultLanguageKey);
};

export const formatDate = (date: Date | string, format?: string): string => 
    `${moment(date).format(format)}`;