import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Flex , Icon, ListItem, Text, Heading, Divider } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { FaHistory } from "react-icons/fa";
import { MdToday } from "react-icons/Md";
import { MdCalendarToday } from "react-icons/Md";



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
      label: 'ToDay',
      icon: MdToday ,
      to:'/MyDay',
     },
    {
     label: 'Next day',
      icon:  MdCalendarToday ,
      to:'/NextDay',
    },
    {
     label: 'Historique',
     icon: FaHistory,
     to:'/Historic',
     },
    ];


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
            color: "black",
          }}>
            <Flex width={"100%"} justify={'space-between'} align={'center'}>
                <Flex align={'center'}>
                    <Icon boxSize={'22px'} as={icon} />
                    <Text fontFamily={theme.fonts.DrawerBody} fontSize={'18px'} ml={3} >{label}</Text>
                </Flex>
            <Flex h={'28px'}  borderRadius={'lg'} bg={'black'} w={"5px"}/>
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
            color: "black",
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
            display={{ base: 'none', sm: "block", md: "block", lg:"block"}}
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


