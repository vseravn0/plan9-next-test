import LanguageCheckBox from "@components/ui/LanguageCheckbox";
import {LANGS} from "@utils/constants";
import LocaleProvider from "@components/localeProvider";
import {useContext} from "react";

export default function CustomHeader() {
    const {locale} = useContext(LocaleProvider)

    return (
        <div>
            {Object.keys(LANGS).map((lang:string) => {
                return (
                    <LanguageCheckBox
                        key={lang}
                        lang={LANGS[lang as keyof typeof LANGS]}
                        isChecked={locale.includes(LANGS[lang as keyof typeof LANGS])}
                    />
                )
            })}
        </div>
    )
}
