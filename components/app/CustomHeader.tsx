import LanguageCheckBox from "@components/ui/LanguageCheckbox";
import {LANGS} from "@utils/constants";
import {useLocalContext} from "@components/localeProvider";

export default function CustomHeader() {

    const {locale} = useLocalContext()

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
