import React from "react";
import { Link } from "@remix-run/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, HStack } from "@chakra-ui/react";

import { useItems } from "~/hooks";
import DeleteButton from "./DeleteButton";

const List: React.FC = () => {
  const { items } = useItems();

  return (
    <TableContainer width={"100%"}>
      <Table variant="striped" size="sm" colorScheme="teal" className="border" borderRadius={4}>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Release</Th>
            <Th>Platform</Th>
            <Th isNumeric>Point</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(item => (
            <Tr key={item.id}>
              <Td>{item.title}</Td>
              <Td>{item.releaseDate}</Td>
              <Td>{item.platform}</Td>
              <Td isNumeric>{item.point}</Td>
              <Td>
                <HStack>
                  <Link to={`${item.id}`}>Edit</Link>
                  <DeleteButton id={item.id!} />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default List;
