import {IReactNodeChildren} from "../types/main";

export default function Layout({ children }: IReactNodeChildren) {
    return (
        <>
            <header className="text-lime-300">head</header>
        <div className="border-2 border-rose-500">
            <main>{children}</main>
        </div>
        </>
    )
}
