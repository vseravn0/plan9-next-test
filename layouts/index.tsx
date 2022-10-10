import {IReactNodeChildren} from "../types/main";
import CustomHeader from "@components/app/CustomHeader";

export default function Layout({ children }: IReactNodeChildren) {
    return (
        <>
            <CustomHeader/>
        <div className="border-2 border-rose-500">
            <main>{children}</main>
        </div>
        </>
    )
}
