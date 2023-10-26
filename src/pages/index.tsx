import { NextPage } from 'next'
import { Stack, Text, Box, Flex,IconButton, Input, FormControl, Button, Divider, Checkbox, Heading, HStack } from "@chakra-ui/react";
import theme from "@/styles/theme";
import { useState } from "react";
import { Textarea } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Outlet } from "react-router-dom";
import logo from 'public/assets/03.png';
import Image from 'next/image';


//Component
import ListeTask from "@/component/ListTask";
import { log } from 'console';
import { FiPlusCircle } from 'react-icons/fi';


interface Props {}


const Home: NextPage<Props> = ({}) => {

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
        <Input h={{ base: 6, sm: 7, md: 8, lg:9 }} placeholder='Filter tasks...'  size={'md'} w={{ base: "xs", sm: "xs", md: "xs", lg: "xs" }} />
        <Button fontSize={14} h={{ base: 6, sm: 7, md: 8, lg:9 }} fontWeight={'normal'} color={'gray.700'}  borderWidth={"1px"} bg={'white'} leftIcon={<FiPlusCircle/>}>
            Status
        </Button>
        <Button fontSize={14} h={{ base: 6, sm: 7, md: 8, lg: 9 }} fontWeight={'normal'} color={'gray.700'} borderWidth={"1px"} bg={'white'} leftIcon={<FiPlusCircle/>}>
            Priority
        </Button>
      </HStack>
      <Button fontSize={14} display={{base: "none", sm:"block"}} h={{ base: 6, sm: 7, md: 8, lg:9 }} fontWeight={'normal'} color={'gray.700'} borderWidth={"1px"} bg={'white'} leftIcon={<FiPlusCircle/>}>
         View
      </Button>
    </Flex>
  </Flex>
}

export default Home