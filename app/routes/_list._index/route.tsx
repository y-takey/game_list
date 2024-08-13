import { useLoaderData } from "@remix-run/react";
import { Container, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";

import { loader } from "./loader";
export const clientLoader = loader;

export default function Index() {
  const { gameItems } = useLoaderData<typeof loader>();

  return (
    <Container maxW={"90%"}>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th isNumeric>Point</Th>
            </Tr>
          </Thead>
          <Tbody>
            {gameItems.map(item => (
              <Tr key={item.id}>
                <Td>{item.title}</Td>
                <Td isNumeric>{item.point}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
