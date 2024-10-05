import { Box, Text, SimpleGrid, Spinner, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { CourseType } from '../types/types'; 


const CourseList: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseType[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get<CourseType[]>('http://localhost:3000/courses');
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Erro ao carregar cursos.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;
  return (
    <>
    <Heading as="h1" size="lg" mb={4}>
          Cursos Ativos
    </Heading>
    <SimpleGrid columns={[1, null, 2]} spacing={4}>
      {courses.map((course) => (
        <Box 
        key={course.id} 
        borderWidth="1px" 
        borderRadius="lg" 
        p={4} 
        onClick={() => navigate(`/course/${course.id}`)} 
        cursor="pointer" 
        transition="0.3s"
        _hover={{ 
          bg: 'gray.100',
          boxShadow: 'md'
        }}
      >
      <Text fontWeight="bold">{course.title}</Text>
          <Text>{course.description}</Text>
        </Box>
      ))}
    </SimpleGrid>
    </>
  );
};

export default CourseList;
