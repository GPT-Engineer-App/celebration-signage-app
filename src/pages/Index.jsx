import React, { useState } from "react";
import { Box, VStack, HStack, Text, Heading, Image, Input, Button, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel } from "@chakra-ui/react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const initialData = {
  birthdays: [
    { id: 1, name: "John Doe", date: "May 15" },
    { id: 2, name: "Jane Smith", date: "August 22" },
  ],
  anniversaries: [
    { id: 1, name: "Mark Johnson", years: 5, date: "June 10" },
    { id: 2, name: "Emily Davis", years: 3, date: "September 5" },
  ],
  holidays: [
    { id: 1, name: "New Year's Day", date: "January 1" },
    { id: 2, name: "Independence Day", date: "July 4" },
  ],
};

const Index = () => {
  const [data, setData] = useState(initialData);
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEdit = (item, category) => {
    setSelectedItem({ ...item, category });
    onOpen();
  };

  const handleDelete = (id, category) => {
    setData((prevData) => ({
      ...prevData,
      [category]: prevData[category].filter((item) => item.id !== id),
    }));
  };

  const handleSave = () => {
    setData((prevData) => ({
      ...prevData,
      [selectedItem.category]: prevData[selectedItem.category].map((item) => (item.id === selectedItem.id ? selectedItem : item)),
    }));
    onClose();
  };

  const handleAdd = (category) => {
    setSelectedItem({ id: Date.now(), name: "", date: "", years: 0, category });
    onOpen();
  };

  return (
    <Box>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Digital Signage
        </Heading>
        {["birthdays", "anniversaries", "holidays"].map((category) => (
          <Box key={category}>
            <HStack justify="space-between">
              <Heading as="h2" size="xl">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Heading>
              <IconButton icon={<FaPlus />} aria-label={`Add ${category}`} onClick={() => handleAdd(category)} />
            </HStack>
            {data[category].map((item) => (
              <Box key={item.id} borderWidth={1} borderRadius="md" p={4} mt={4}>
                <HStack justify="space-between">
                  <VStack align="start">
                    <Text fontSize="xl">{item.name}</Text>
                    <Text>{item.date}</Text>
                    {category === "anniversaries" && <Text>Years: {item.years}</Text>}
                  </VStack>
                  <HStack>
                    <IconButton icon={<FaEdit />} aria-label={`Edit ${category}`} onClick={() => handleEdit(item, category)} />
                    <IconButton icon={<FaTrash />} aria-label={`Delete ${category}`} onClick={() => handleDelete(item.id, category)} />
                  </HStack>
                </HStack>
              </Box>
            ))}
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedItem?.id ? "Edit" : "Add"} {selectedItem?.category}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={selectedItem?.name || ""} onChange={(e) => setSelectedItem((prev) => ({ ...prev, name: e.target.value }))} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input value={selectedItem?.date || ""} onChange={(e) => setSelectedItem((prev) => ({ ...prev, date: e.target.value }))} />
            </FormControl>
            {selectedItem?.category === "anniversaries" && (
              <FormControl mt={4}>
                <FormLabel>Years</FormLabel>
                <Input
                  type="number"
                  value={selectedItem?.years || 0}
                  onChange={(e) =>
                    setSelectedItem((prev) => ({
                      ...prev,
                      years: parseInt(e.target.value),
                    }))
                  }
                />
              </FormControl>
            )}
            <Button mt={4} colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
