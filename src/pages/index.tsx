import { NextPage } from 'next'
import { Text, Box, Flex,Input, Button, Checkbox, Heading, HStack, TableContainer, Thead, Table, Th, Tr, Icon,Tbody, Td, IconButton } from "@chakra-ui/react";
import theme from "@/styles/theme";
import logo from 'public/assets/03.png';
import Image from 'next/image';
import { RiEqualizerLine } from "react-icons/ri";
import { FiArrowRight, FiPlusCircle, FiMoreHorizontal } from 'react-icons/fi';
import { LuAlarmMinus } from "react-icons/lu";
import { BsChevronExpand } from "react-icons/bs";
import { MdOutlineTaskAlt } from 'react-icons/Md';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { useQuery } from '@apollo/client';

//Mutation
import { GET_TASKS } from "../graphQl/Queries/getTask";
import { useState } from 'react';


interface Props { }

interface Task {
  title: String;
  description: String;
  status: String;
  priority: String;
}


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
    }
  ];

  const { loading, data, error } = useQuery(GET_TASKS, {
    onCompleted: (data) =>{
    console.log('our data',data);
    }, onError(error) {
      console.log('Error:', error.message);
    },
  });

  if (loading) return <p>Loading...</p>;

  // progress, backlog, todo, canceled, done
  return <Flex  p={5}  direction={'column'}>
    <Flex w={'100%'} align={'center'} justify={'space-between'}>
    <Flex mb={7} direction={'column'}>
      <Heading  as='h3' size='lg' mb={1} >Welcome back!</Heading>
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
      <Button fontSize={14} display={{base: "none", sm:"block"}} h={{ base: 6, sm: 7, md: 8, lg: 9 }} fontWeight={'normal'} color={'gray.700'} borderWidth={"1px"} bg={'white'} leftIcon={<RiEqualizerLine /> }>
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
                }} rightIcon={<BsChevronExpand />} fontSize={14} bg={'white'} color={'gray.500'}>
                  {name.name}
                </Button>
                  </Th>
                ))
              }
               <Th></Th>
          </Tr>
          </Thead>
          <Tbody>
            {
              data.getAllTasks.map((t: Task) => (
              <Tr>
              <Td>
                <Checkbox size='sm'>
                  TASK 
                </Checkbox>
              </Td>
              <Td>
                 <HStack spacing={3}>
                   <Text color={'gray.900'} fontSize={'sm'} variant=''>{ t.title}</Text>
                   <Text color={'gray.400'} fontSize={'sm'} variant=''>{ t.description}</Text>
                 </HStack>
              </Td>
              <Td>
                <HStack spacing={1}>
                  <Icon color={'gray.700'} boxSize={('15px')} as={t.status === 'Progress'? LuAlarmMinus : MdOutlineTaskAlt }/>
                  <Text color={'gray.700'} fontSize={'sm'} variant=''>{ t.status}</Text>
                </HStack>
              </Td>
              <Td>
                <HStack spacing={1}>
                  <Icon color={'gray.700'} boxSize={('15px')} as={t.priority === 'Medium'? FiArrowRight : AiOutlineArrowUp}/>
                  <Text color={'gray.700'} fontSize={'sm'} variant=''>{ t.priority}</Text>
                </HStack>
              </Td>
                  <Td>
                    <IconButton _hover={{ bg: "white"}} bg={'white'} icon={<FiMoreHorizontal/>} aria-label={''} />
                  </Td>
            </Tr>
              ))
            }
          </Tbody>
      </Table>
    </TableContainer>
    </Flex>
  </Flex>
}

export default Home