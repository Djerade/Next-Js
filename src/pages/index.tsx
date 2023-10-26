import { NextPage } from 'next'
import { Stack, Text, Box, Flex,IconButton, Input, FormControl, Button, Divider, Checkbox, Heading } from "@chakra-ui/react";
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


interface Props {}


const Home: NextPage<Props> = ({}) => {

  return <Flex align={'center'} justify={'space-between'}>
    <Flex p={5} direction={'column'}>
      <Heading  as='h2' size='lg' >Welcom back !</Heading>
      <Text color={'gray.400'} fontFamily={theme.fonts.body} >Here's a list of your tasks for this month !</Text>
    </Flex>
    <Box mr={5} w={{ base:"35px", sm:"35px", md:"35px", lg:"40px"}}>
      <Image  src={logo}  alt={'image'}/>
    </Box>
  </Flex>
}

export default Home