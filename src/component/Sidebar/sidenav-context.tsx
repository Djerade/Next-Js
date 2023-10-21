import { useDisclosure } from "@chakra-ui/react";
import { createContext } from "react";

const SIdenavContext = createContext<ReturnType<typeof  useDisclosure>| null> (
    null
);

export default SIdenavContext;

