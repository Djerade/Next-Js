import { Flex,  Link, IconButton, List, Text , ListItem, Tooltip, Icon } from "@chakra-ui/react"
import { SidenavItem, SidenavItemsProp } from "./interfaceNav"
import {NavLink } from "react-router-dom";

const SidenavItem = ({ navItem, mode = " semi"}: SidenavItemsProp) => {
    //Mode over
    const sidebarItemInOverMode = ( item: SidenavItem, index: number) => {
        return(
            <ListItem>
                <Link as={NavLink}  display={'block'} w={'full'} _activeLink={{ bg: 'red', color: "white"}}  _focus={{ bg: 'gray'}} to={item.link}>
                    <Flex alignItems={"center"}  >
                        <Icon as={item.icon} />
                        <Text variant=''></Text>
                    </Flex>
                </Link>
            </ListItem>
        )
    }
    // Mode semi
    const sidebarItemInSemiMode = ({ icon: Icon, ...item}: SidenavItem, index: number) => {
       return(
       <ListItem key={index}>
         <Tooltip placement="right" label={item.label} >
            <IconButton  as={NavLink} _activeLink={{ bg: 'red', color: "white"}} _hover={{ bg: "gray.200"}} _focus={{ bg: "gray.100" }} icon={<Icon/>} to={item.link} key={index} aria-label={""}/>
         </Tooltip>
       </ListItem>)
    }
    return(
        <List>
            { 
            mode === ' semi'
            ? navItem.map((item: SidenavItem, index: number) => sidebarItemInSemiMode(item, index))
            : navItem.map((item: SidenavItem, index: number) => sidebarItemInOverMode(item, index))
            }
        </List>
    )
}

export default SidenavItem;