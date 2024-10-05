import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import type { CourseType } from '../types/types';

const CourseEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseType | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [videoUrls, setVideoUrls] = useState<string[]>(['']);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        
        const response = await axios.get<CourseType>(`http://localhost:3000/courses/${id}`);
        const courseData = response.data;

        if (typeof courseData.video_urls === 'string') {
          courseData.video_urls = JSON.parse(courseData.video_urls);
        }

        setCourse(courseData);
        setTitle(courseData.title);
        setDescription(courseData.description);
        setStartDate(courseData.start_date);
        setEndDate(courseData.end_date);
        setVideoUrls(Array.isArray(courseData.video_urls) ? courseData.video_urls : ['']);

      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedCourse: CourseType = {
        ...course!,
        title,
        description,
        start_date: startDate,
        end_date: endDate,
        video_urls: videoUrls.filter(url => url),
      };
      await axios.put(`http://localhost:3000/courses/${id}`, updatedCourse);
      navigate('/');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleVideoUrlChange = (index: number, value: string) => {
    const newVideoUrls = [...videoUrls];
    newVideoUrls[index] = value;
    setVideoUrls(newVideoUrls);
  };

  const addVideoUrlField = () => {
    setVideoUrls([...videoUrls, '']);
  };

  if (!course) return <div>Loading...</div>;

  return (
    <Box as="form" onSubmit={handleSubmit} p={4}>
      <FormControl isRequired mb={4}>
        <FormLabel>Título</FormLabel>
        <Input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Título do Curso" 
        />
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Descrição</FormLabel>
        <Textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Descrição do Curso" 
        />
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Data de Início</FormLabel>
        <Input 
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)} 
        />
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Data de Término</FormLabel>
        <Input 
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)} 
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>URLs dos Vídeos</FormLabel>
        {videoUrls.map((url, index) => (
          <Input 
            key={index} 
            value={url} 
            onChange={(e) => handleVideoUrlChange(index, e.target.value)} 
            placeholder={`URL do Vídeo ${index + 1}`} 
            mb={2}
          />
        ))}
        <Button onClick={addVideoUrlField} colorScheme="blue" mt={2}>
          Adicionar URL de Vídeo
        </Button>
      </FormControl>
      <Button type="submit" colorScheme="teal">
        Atualizar Curso
      </Button>
    </Box>
  );
};

export default CourseEdit;
