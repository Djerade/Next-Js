import { useConst, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import SIdenavContext from "./sidenav-context";

function useSidenav() {
    const sidebar = useContext(SIdenavContext)
    if (!sidebar) {
        throw new Error(" une errore");
    }
    return{...(sidebar as ReturnType<typeof useDisclosure>)}
}

export default useContext;