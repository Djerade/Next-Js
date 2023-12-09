"use client"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/modal"
import { FormControl, Input, Textarea, Select, Button } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { EDITE_TASK } from "@/graphQl/Mutation/editeTask"
import { useMutation } from "@apollo/client"


const FormTask = (props: {
  nameHeader: String;
  nameButton: String;
  id: string;
  title: string;
  description: string;
  priority: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const { nameHeader, nameButton, title, id, description, priority, isOpen, onClose } = props;
  const [newTitle, setTitle] = useState(title)
  const [newDescription, setDescription] = useState(description)
  const [newPriority, setPriority] = useState(priority)
  useEffect(() => {
    setTitle(title)
    setDescription(description)
    setPriority(priority)
  }, [title, description, priority])
  const handleSubmit = () => {
    edite();
    setTitle("");
    setDescription("");
    setPriority("");
  }
  const [edite] = useMutation(EDITE_TASK, {
    variables: {
      id: id,
      title: newTitle,
      description: newDescription,
      priority: newPriority
    }, onError(error) {
      console.log('Error:', error.message);
    },
  });

    
    return ( <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent> 
            <ModalHeader >{ nameHeader}</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <Input name='newTitle'
                      value={newTitle}
                      type='text'
                      onChange={(e) => setTitle(e.target.value)}
                     />
                </FormControl>
                <FormControl isRequired mt={5}>
                    <Textarea
                       onChange={(e) => setDescription(e.target.value)}
                       value={newDescription}
                      name='newDescription'
                      />
                </FormControl>
                <FormControl isRequired mt={5}>
                    <Select
                      onChange={(e) => setPriority(e.target.value)}
                      value={newPriority}
                      name='newPriority'  >
                    <option value='High'>High</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                  </Select>
                </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
                <Button bg={'black'} onClick={() =>{ handleSubmit() ,onClose()}} color={"white"} >{ nameButton }</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>)
}
export default FormTask;