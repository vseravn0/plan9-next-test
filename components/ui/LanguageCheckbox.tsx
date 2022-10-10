import {useContext, useEffect, useState} from "react";
import LocaleProvider from "@components/localeProvider";

export default function LanguageCheckBox({lang,isChecked}:{lang:string, isChecked: boolean}) {
    const {locale,localeHandler} = useContext(LocaleProvider)

    return (
        <div>
            <input
                type="checkbox"
                id={lang}
                name={lang}
                checked={isChecked}
                onChange={() => localeHandler(locale,lang)}/>
            <label
                htmlFor={lang}
            >
                {lang}
            </label>
        </div>
    )
}
