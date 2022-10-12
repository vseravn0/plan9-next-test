import LanguageCheckBox from "@components/ui/LanguageCheckbox";
import {LANGS} from "@utils/constants";
import {useLocalContext} from "@components/localeProvider";

export default function CustomHeader() {

    const {locale} = useLocalContext()

    return (
        <div className="flex justify-center my-5 gap-2">
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
