"use client"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/modal"
import { useDisclosure, FormControl, Input, Textarea, Select, Button } from "@chakra-ui/react"
import { useRef } from "react"



const FormTask = (props: {
  nameHeader: String;
  nameButton: String;
  title: String;
  description: String;
  priority: String;
  isOpen: boolean;
  onClose: () => void;
}) => {
    const initialRef = useRef(null)
  const finalRef = useRef(null)
  const { nameHeader, nameButton, title, description, priority, isOpen, onClose } = props;
  console.log('--open:', isOpen);
   console.log('--close:', onClose);
    return ( <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent> 
            <ModalHeader >{ nameHeader}</ModalHeader>
          <ModalBody>
            <form >
              <FormControl isRequired>
                <Input  name='title' type='text'  placeholder='Title'/>
              </FormControl>
              <FormControl isRequired mt={5}>
                <Textarea  name='description'   placeholder='Description'/>
              </FormControl>
              <FormControl isRequired mt={5}>
                <Select  placeholder={'Priority'} name='priority'  >
                  <option value="..."></option>
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
                <Button bg={'black'} onClick={() =>{ onClose()}} color={"white"} >{ nameButton }</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>)
}
export default FormTask;