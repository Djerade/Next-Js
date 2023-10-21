import React from "react";
import SidenavItem from "./SidenavItem";
import { VStack, Icon, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import useSidenav from "./useSidenav";
import { SiWwise } from "react-icons/si";
import { SidenavItemsProp } from "./interfaceNav";

const Sidenave = ({navItem}: SidenavItemsProp) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return(
        <React.Fragment>
            <VStack display={{ base:"none", md:'flex'}} spacing={5} as="nav">
                <Icon boxSize={5} as={SiWwise} />
                <SidenavItem navItem={navItem}/>
            </VStack>
            <Drawer placement="left" isOpen={isOpen}  onClose={onClose}  >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>To do list</DrawerHeader>
                    <DrawerBody>
                        <SidenavItem navItem={navItem} mode="over" />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    )
}

export default Sidenave;