export default function LanguageCheckBox({lang}:{lang:string}) {
    return (
        <div>
            <input type="checkbox" id={lang} name={lang}/>
            <label htmlFor={lang}>{lang}</label>
        </div>
    )
}
