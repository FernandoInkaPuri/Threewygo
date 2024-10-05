import { Box, Text, Button } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { CourseType } from '../types/types'; 

const Course: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseType | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get<CourseType>(`http://localhost:3000/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/courses/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <Box>
      <Text fontWeight="bold">{course.title}</Text>
      <Text>{course.description}</Text>
      <Button mt={4} colorScheme="red" onClick={handleDelete}>
        Deletar Curso
      </Button>
      <Button mt={4} ml={4} onClick={() => navigate(`/course/edit/${id}`)}>
        Editar Curso
      </Button>
      {/* Aqui você pode adicionar a lógica para mostrar os vídeos se necessário */}
    </Box>
  );
};

export default Course;
