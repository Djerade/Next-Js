import { Box, Flex, Link , Icon, ListItem, Text } from "@chakra-ui/react"
import { IconType } from "react-icons";

import { FiGrid, FiPieChart } from "react-icons/fi";

interface  SideNave{
    label: string;
    icon: IconType;
    to: string;
}

const LinkItems: Array<SideNave> = [
    {
      label: 'Tableau de bord',
      icon: FiGrid,
      to:'../',
    },
    {
        label: 'Tableau de bord',
        icon: FiGrid,
        to:'../',
      },

    ];

const NaveItem = ({ label, icon, to}: SideNave) => {
    return(
    
            <Flex>
                <Icon as={icon} />
                <Text>{label}</Text>
          </Flex>
    
    )
}

const SidebarContent = () => {
 


    return (
        <Box>
            {
                LinkItems.map((item, index) =>(
                    <NaveItem key={index} label={ item.label}  icon={item.icon} to={item.to} />
                ))
            }
        </Box>
    )
}

export default SidebarContent;