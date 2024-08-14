import { Children } from "react";
import { Fontprovider } from "./hooks/Font";

export function AppProvider({}) {
    return <Fontprovider>{Children}</Fontprovider>;
}