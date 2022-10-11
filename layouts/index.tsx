import {IReactNodeChildren} from "../types/main";
import CustomHeader from "@components/app/CustomHeader";
import {useEffect, useState} from "react";
import {LANGS} from "@utils/constants";
import LocaleProvider from "@components/localeProvider";

export default function Layout({children}: IReactNodeChildren) {

    let userLocale = ['en']

    useEffect(() => {
        userLocale = [LANGS[window.navigator.language as keyof typeof LANGS]]
        localStorage.setItem('version', process.env.VERSION || '1.0.0')
    }, [])

    const [locale, setLocale] = useState<string[]>(userLocale)

    return (
        <>
            <LocaleProvider.Provider value={{locale, setLocale}}>
                <CustomHeader/>
                <div>
                    <main>{children}</main>
                </div>
            </LocaleProvider.Provider>
        </>
    )
}
