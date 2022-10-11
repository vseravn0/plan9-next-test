import {useContext, useEffect, useState} from "react";
import LocaleProvider from "@components/localeProvider";

export default function LanguageCheckBox({lang,isChecked}:{lang:string, isChecked: boolean}) {
    const [locale, setLocale] = useContext(LocaleProvider)

    const localeHandler = (locales: string[], lang: string): void => {
        console.log(locales,lang)
        const _locale = [...locales]
        _locale.includes(lang)
            ? _locale.splice(_locale.findIndex((item: string) => item === lang), 1)
            : _locale.push(lang);
        console.log(_locale)
       return _locale
    }

    return (
        <div>
            <input
                type="checkbox"
                id={lang}
                name={lang}
                checked={isChecked}
                onChange={() => setLocale(localeHandler(locale,lang))}/>
            <label
                htmlFor={lang}
            >
                {lang}
            </label>
        </div>
    )
}
