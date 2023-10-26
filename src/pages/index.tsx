import { NextPage } from 'next'
import { Stack, Text, Box, Flex,IconButton, Input, FormControl, Button, Divider, Checkbox, Heading } from "@chakra-ui/react";
import theme from "@/styles/theme";
import { useState } from "react";
import { Textarea } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Outlet } from "react-router-dom";

//Component
import ListeTask from "@/component/ListTask";


interface Props {}


const Home: NextPage<Props> = ({}) => {

  return <>
    <Text variant=''> dashboard</Text>
  </>
}

export default Home