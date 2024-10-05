import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Box bg="purple.300" p={4} color="white">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="5xl" fontWeight="bold">Threewygo</Text>
        <Flex>
          <Link to="/create">
            <Button mr={4}>
              Adicionar Novo Curso
            </Button>
          </Link>
          <Link to="/">
            <Button  mr={4}>
              Listar Cursos
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
