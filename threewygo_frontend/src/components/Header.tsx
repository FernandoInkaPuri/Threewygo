import { Box, Flex, Text, Menu, MenuButton, MenuList, MenuItem, IconButton, Button } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Box bg="purple.300" p={4} color="white">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize={{ base: '3xl', md: '5xl' }} fontWeight="bold">
          Threewygo
        </Text>

        <Flex display={{ base: 'none', md: 'flex' }} alignItems="center">
          <Link to="/create">
            <Button colorScheme="purple.100" fontSize='lg' fontWeight="bold">
              Adicionar Novo Curso
            </Button>
          </Link>
          <Link to="/">
            <Button colorScheme="purple.100" fontSize='lg' fontWeight="bold">
              Listar Cursos
            </Button>
          </Link>
        </Flex>

        <Flex display={{ base: 'flex', md: 'none' }}>
          <Menu>
            <MenuButton 
              as={IconButton} 
              icon={<HamburgerIcon />} 
              colorScheme="purple.300" 
            />
            <MenuList bg="purple.300" color="white">
              <MenuItem bg="purple.300" color="white" _hover={{ bg: "purple.400" }}>
                <Link to="/create">Adicionar Novo Curso</Link>
              </MenuItem>
              <MenuItem bg="purple.300" color="white" _hover={{ bg: "purple.400" }}>
                <Link to="/">Listar Cursos</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
