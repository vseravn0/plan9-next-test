import {useContext,createContext} from "react";

interface ILocaleContextInterface {
    locale: string[],
    setLocale: (locale:string[]) => void
}

const context = createContext<ILocaleContextInterface>({
    locale: ['en'],
    setLocale: () => {/**/}
})

export const useLocalContext = () => useContext(context)

export default context
