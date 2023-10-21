import Head from "next/head";
import { Heading,Stack, Text, Box, Flex,IconButton, Input, FormControl, Button, HStack, Divider, Checkbox } from "@chakra-ui/react";
import theme from "@/styles/theme";
import { useState } from "react";
import { Textarea } from "@chakra-ui/react";
import { CalendarIcon, DeleteIcon } from "@chakra-ui/icons";
import { BsBarChart } from "react-icons/bs";
import { Outlet } from "react-router-dom";

//Component
import ListeTask from "@/component/ListTaxk";
import SidenavContainer from "@/component/Sidebar/SidenavContainer";
import { SidenavItem } from "@/component/Sidebar/interfaceNav";
import Sidenave from "@/component/Sidebar/sidenav";
import Layout from "@/component/Layout/Layoute";

interface Task {
  title: String;
  description: String;
  completed: Boolean;
}

export default function Home() {

  const [listTask, setlistTask] = useState<Task[]>([])
  const [newTask, setnewTask] = useState({
    title: '',
    description: '',
    completed: false
  })

  const handleChange = (event: any) =>{
    setnewTask({
      ...newTask,
      [event.target.name] : event.target.value
    })
  }
  
  const addTask = () =>{
   setlistTask([...listTask, newTask]) 
   setnewTask({
    title: '',
    description: '',
    completed: false
   })
  }

  const doneTask = (id: number) =>{
    const task = listTask[id]
    if (task.completed == true) {
      task.completed = false
    } else {
      if ( task.completed == false ) {
        task.completed = true
      }
    }
  }

  const deleteTask = (id: number) =>{
     const newListTask = listTask.filter((item : Task, index) => index != id)
     setlistTask(newListTask)
   }  



   
  return (
    <>
    <Box>
      index
    </Box>
    </>
  );
}

