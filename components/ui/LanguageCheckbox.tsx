import {useLocalContext} from "@components/localeProvider";

export default function LanguageCheckBox({lang, isChecked}: { lang: string, isChecked: boolean }) {
    const {locale, setLocale} = useLocalContext()

    const localeHandler = (locales: string[], lang: string): string[] => {
        const _locale = [...locales]
        _locale.includes(lang)
            ? _locale.splice(_locale.findIndex((item: string) => item === lang), 1)
            : _locale.push(lang);
        return _locale
    }

    return (
        <div className="flex items-center mb-4">
            <input
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                type="checkbox"
                id={lang}
                name={lang}
                checked={isChecked}
                onChange={() => setLocale(localeHandler(locale, lang))}/>
            <label
                className="ml-2 text-sm font-medium text-gray-900"
                htmlFor={lang}
            >
                {lang}
            </label>
        </div>
    )
}
