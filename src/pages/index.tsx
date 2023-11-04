import { NextPage } from 'next'
import { Text, Box, Flex,Input, Button, Checkbox, Heading, HStack, TableContainer, Thead, Table, Th, Tr, Icon,Tbody, Td } from "@chakra-ui/react";
import theme from "@/styles/theme";
import logo from 'public/assets/03.png';
import Image from 'next/image';


//Component
import { FiArrowRight, FiPlusCircle } from 'react-icons/fi';
import { LuAlarmMinus } from "react-icons/lu";
import { BsChevronExpand } from "react-icons/bs";

interface Props {}


const Home: NextPage<Props> = ({ }) => {
  const headerTask = [
    {
      name: ' Title'
    },
    {
      name: 'Status'
    },
    {
      name: 'Priority'
    },
    {
      name: ''
    }
  ];


  return <Flex  p={5}  direction={'column'}>
    <Flex w={'100%'} align={'center'} justify={'space-between'}>
    <Flex mb={7} direction={'column'}>
      <Heading  as='h2' size='lg' mb={1} >Welcome back!</Heading>
      <Text color={'gray.400'} fontFamily={theme.fonts.body} >Here's a list of your tasks for this month !</Text>
    </Flex>
    <Box mr={5} w={{ base:"35px", sm:"35px", md:"35px", lg:"40px"}}>
      <Image  src={logo}  alt={'image'}/>
    </Box>
    </Flex>
    <Flex justify={'space-between'}>
      <HStack spacing={5}>
        <Input fontSize={14} h={{ base: 6, sm: 7, md: 8, lg:9 }} placeholder='Filter tasks...'  size={'md'} w={{ base: "xs", sm: "xs", md: "xs", lg: "xs" }} />
        <Button fontSize={14} h={{ base: 6, sm: 7, md: 8, lg:9 }} fontWeight={'normal'} color={'gray.700'}  borderWidth={"1px"} bg={'white'} leftIcon={<FiPlusCircle/>}>
            Status
        </Button>
        <Button fontSize={14} h={{ base: 6, sm: 7, md: 8, lg: 9 }} fontWeight={'normal'} color={'gray.700'} borderWidth={"1px"} bg={'white'} leftIcon={<FiPlusCircle/>}>
            Priority
        </Button>
      </HStack>
      <Button fontSize={14} display={{base: "none", sm:"block"}} h={{ base: 6, sm: 7, md: 8, lg: 9 }} fontWeight={'normal'} color={'gray.700'} borderWidth={"1px"} bg={'white'} leftIcon={<FiPlusCircle/>}>
         View
      </Button>
    </Flex>
    <Flex mt={4} borderRadius={8} width={'100%'} borderWidth={'1px'}>
      <TableContainer width={'100%'}>
      <Table>
        <Thead>
            <Tr>
              <Th>
                <Checkbox  size=''>
                  <Text color={'gray.500'} variant=''>
                    Task
                  </Text>
                </Checkbox>
              </Th>
              {
                headerTask.map((name) => (
                <Th>
                <Button _hover={{
                  bg: "gray.100",
                  color: "black"
                }} rightIcon={<BsChevronExpand />} fontSize={12} bg={'white'} color={'gray.500'}>
                  {name.name}
                </Button>
                </Th>  
                ))
              }
          </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Checkbox size='sm'>
                  TASK 584
                </Checkbox>
              </Td>
              <Td>
                 <Text color={'gray.900'} fontSize={'sm'} variant=''>You can't compress the program without quantifying the open-source SSD</Text>
              </Td>
              <Td>
                <HStack spacing={1}>
                  <Icon color={'gray.400'} boxSize={('15px')} as={LuAlarmMinus}/>
                  <Text color={'gray.400'} fontSize={'sm'} variant=''>in Progress</Text>
                </HStack>
              </Td>
              <Td>
                <HStack spacing={1}>
                  <Icon color={'gray.400'} boxSize={('15px')} as={FiArrowRight}/>
                  <Text color={'gray.400'} fontSize={'sm'} variant=''>Medium</Text>
                </HStack>
              </Td>
              <Td>...</Td>
            </Tr>
          </Tbody>
      </Table>
    </TableContainer>
    </Flex>
  </Flex>
}

export default Home