import React from "react";
import { Link } from "@remix-run/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { GameItem } from "~/types";

type Props = {
  items: GameItem[];
};

const List: React.FC<Props> = props => {
  const { items } = props;

  return (
    <TableContainer width={"100%"}>
      <Table variant="striped" size="sm" colorScheme="teal" className="border" borderRadius={4}>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th isNumeric>Point</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(item => (
            <Tr key={item.id}>
              <Td>{item.title}</Td>
              <Td isNumeric>{item.point}</Td>
              <Td>
                <Link to={`${item.id}`}>Edit</Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default List;
