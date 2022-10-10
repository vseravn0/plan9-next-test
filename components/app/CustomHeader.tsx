import {useMemo} from "react";

import LanguageCheckBox from "@components/ui/LanguageCheckbox";

import {LANGS} from "@utils/constants";

export default function CustomHeader() {

    return (
        <div>
            {LANGS.map((lang:string) => {
                return (
                    <LanguageCheckBox
                        key={lang}
                        lang={lang}
                    />
                )
            })}
        </div>
    )
}
