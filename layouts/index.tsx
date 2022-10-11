import {IReactNodeChildren} from "../types/main";
import CustomHeader from "@components/app/CustomHeader";
import {useEffect, useState} from "react";
import {LANGS} from "@utils/constants";
import LocaleProvider from "@components/localeProvider";

export default function Layout({ children }: IReactNodeChildren) {

    let userLocale = ['en']

    useEffect(() => {
        userLocale = [LANGS[window.navigator.language as keyof typeof LANGS]]
    },[])

    const [locale, setLocale] = useState<string[]>(userLocale)

    return (
        <>
            <LocaleProvider.Provider value={[locale,setLocale]}>
                <CustomHeader/>
                <div className="border-2 border-rose-500">
                    <main>{children}</main>
                </div>
            </LocaleProvider.Provider>
        </>
    )
}
