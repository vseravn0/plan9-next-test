import {IReactNodeChildren} from "../types/main";
import CustomHeader from "@components/app/CustomHeader";
import localeProvider from "@components/localeProvider";
import {useEffect, useState} from "react";
import {LANGS} from "@utils/constants";

export default function Layout({ children }: IReactNodeChildren) {
    const [locale,setLocale] = useState<string[]>([])

    useEffect(() => {
        setLocale([LANGS[window.navigator.language as keyof typeof LANGS]])
    }, [])

    return (
        <>
            <localeProvider.Provider value={[locale,setLocale]}>
                <CustomHeader/>
                <div className="border-2 border-rose-500">
                    <main>{children}</main>
                </div>
            </localeProvider.Provider>
        </>
    )
}
