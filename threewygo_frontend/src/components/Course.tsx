import { Box, Text, Button, AspectRatio, useBreakpointValue } from '@chakra-ui/react';
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
        const courseData = response.data;

        if (typeof courseData.video_urls === 'string') {
          courseData.video_urls = JSON.parse(courseData.video_urls);
        }

        setCourse(courseData);
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
    <Box p={4}>
      <Text fontWeight="bold" textAlign="center" fontSize="5xl" my="2">{course.title}</Text>
      <Text textAlign="center" fontSize="3xl" my={2}>{course.description}</Text>
      
      {course.video_urls.length > 0 && (
        <Box mt={4}>
          {course.video_urls.map((url, index) => {
            const videoId = url.split('v=')[1];
            const embedUrl = `https://www.youtube.com/embed/${videoId.split('&')[0]}`;
            return (
              <Box 
                key={index} 
                borderWidth="1px" 
                borderRadius="md" 
                overflow="hidden" 
                boxShadow="md"
                width="60%"
                mx="auto"
                my={8}
              >
                <Text p={2} bg="gray.100" fontWeight="bold">Aula {index + 1}</Text>
                <AspectRatio ratio={16 / 9}>
                  <iframe 
                    src={embedUrl} 
                    title={`Vídeo ${index + 1}`} 
                    allowFullScreen 
                    style={{ border: 'none', width: '100%', height: '100%' }}
                  />
                </AspectRatio>
              </Box>
            );
          })}
        </Box>
      )}

      <Button mt={4} colorScheme="red" onClick={handleDelete}>
        Deletar Curso
      </Button>
      <Button mt={4} ml={4} onClick={() => navigate(`/course/edit/${id}`)}>
        Editar Curso
      </Button>
    </Box>
  );
};

export default Course;
