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

  const aspectRatioSize = useBreakpointValue({ base: '100%', md: '90%', lg: '90%' });
  if (!course) return <div>Loading...</div>;
  return (
    <Box p={4}>
      <Text fontWeight="bold" fontSize="xl">{course.title}</Text>
      <Text mt={2}>{course.description}</Text>
      
      {course.video_urls.length > 0 && (
        <Box mt={4}>
          <Text fontWeight="bold">Vídeos:</Text>
          {course.video_urls.map((url, index) => {
            const videoId = url.split('v=')[1];
            const embedUrl = `https://www.youtube.com/embed/${videoId.split('&')[0]}`;
            return (
              <Box key={index} mt={4} display="flex" flexDirection="column" alignItems="center">
                <Text>Vídeo {index + 1}:</Text>
                <AspectRatio ratio={16 / 9} mt={2} width={aspectRatioSize}>
                  <iframe 
                    src={embedUrl} 
                    title={`Vídeo ${index + 1}`} 
                    allowFullScreen 
                    style={{ border: 'none' }}
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
