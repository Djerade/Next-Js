
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Flex , Icon, ListItem, Text, Heading, Divider } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { FaHistory } from "react-icons/fa";

import { FiGrid, FiPieChart } from "react-icons/fi";
import { Route } from "react-router-dom";

//Component
import theme from "@/styles/theme";

interface  SideNave{
    label: string;
    icon: IconType;
    to: string;
}

const LinkItems: Array<SideNave> = [
    {
      label: 'Tableau de bord',
      icon: FiPieChart,
      to:'/',
    },
    {
        label: 'Next day',
        icon: FiGrid,
        to:'/NextDay',
      },
      {
        label: 'Historique',
        icon: FaHistory,
        to:'',
      },
    ];

    const subrillance = () => {
        return(
            <Box h={"full"} w={'10%'} bg={'red'} />
        )
    }

const NaveItem = ({ label, icon, to}: SideNave) => {
    const pathname = usePathname();
    const active = to === pathname;

    return(
        <Link  href={to}>
          {active
          ?<Flex 
          direction={'row'}
          p={2} 
          borderRadius={'lg'}
          align={"center"}
          justify={'start'}
          cursor={'pointer'}
          _hover={{
            bg: "black",
            color: "white",
          }}>
            <Flex width={"100%"} justify={'space-between'} align={'center'}>
                <Flex align={'center'}>
                    <Icon boxSize={'22px'} as={icon} />
                    <Text fontFamily={theme.fonts.DrawerBody} fontSize={'18px'} ml={3} >{label}</Text>
                </Flex>
            <Flex h={'30px'}  borderRadius={'lg'} bg={'gray.300'} w={"5px"}/>
            </Flex>
          </Flex>
          :<Flex 
          direction={'row'}
          p={2} 
          borderRadius={'lg'}
          align={"center"}
          justify={'start'}
          color={'gray.400'}
          cursor={'pointer'}
          _hover={{
            bg: "black",
            color: "white",
          }}  >
                <Icon boxSize={'22px'} as={icon} />
                <Text fontFamily={theme.fonts.DrawerBody} fontSize={'18px'} ml={3} >{label}</Text>
          </Flex>}
        </Link>
    )
}

const SidebarContent = ({}) => {
 


    return (
        <Box
            w={'25%'}    
            h={'-webkit-fit-content'}
            justifyItems={"center"}
            position={"sticky"}
            p={4}
            
            bg={'#F6F6F6'}
            height={'900px'}
         >
            <Flex mb={5}  justify={'center'} w={"full"} p={5} direction={'row'} >
                <Box>
                 <Heading as='h2' color={'gray'} size='md' >DoTheWork</Heading>
                </Box>
            </Flex>
            <Divider size={'50px'} colorScheme="red" />
            <Flex mt={5} direction={'column'} >
            {
                LinkItems.map((item, index) =>(
                    <NaveItem key={index} label={ item.label}  icon={item.icon} to={item.to} />
                ))
            }
            </Flex>
            
        </Box>
    )
}

export default SidebarContent;