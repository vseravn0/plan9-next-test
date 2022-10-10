import {useContext, useEffect, useState} from "react";
import LocaleProvider from "@components/localeProvider";

export default function LanguageCheckBox({lang,isChecked}:{lang:string, isChecked: boolean}) {
    const [locale,setLocale] = useContext(LocaleProvider)

    const localeHandler = (locales:string[],lang:string) => {
        const test = [...locales]
        test.includes(lang) ? test.splice(test.findIndex(item => {item === lang}),1) : test.push(lang);
        return test
    }

    return (
        <div>
            <input
                type="checkbox"
                id={lang}
                name={lang}
                checked={isChecked}
                onChange={() => setLocale(() => localeHandler(locale,lang))}/>
            <label
                htmlFor={lang}
            >
                {lang}
            </label>
        </div>
    )
}
