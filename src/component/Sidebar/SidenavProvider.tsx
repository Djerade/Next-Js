import React from "react";
import SIdenavContext from "./sidenav-context";
import { useDisclosure } from "@chakra-ui/react";

function SidenavProvider({
    children,
    ...props
}: {
    children: React.ReactNode
}) {
    const disclosure = useDisclosure()
    return(
        <SIdenavContext.Provider {...props} value={{... disclosure}} >
            {children}
        </SIdenavContext.Provider>
    )
}


export default SidenavProvider;