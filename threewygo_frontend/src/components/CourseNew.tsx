import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import type { CourseType } from '../types/types';

const CourseNew: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [videoUrls, setVideoUrls] = useState<string[]>(['']);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCourse: CourseType = {
        id: 0, 
        title,
        description,
        start_date: startDate,
        end_date: endDate,
        video_urls: videoUrls.filter(url => url),
      };
      await axios.post('http://localhost:3000/courses', newCourse);
      navigate('/');
    } catch (error) {
      console.error('Error creating course:', error);
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
        <Button onClick={addVideoUrlField} colorScheme="blue">
          Adicionar URL de Vídeo
        </Button>
      </FormControl>
      <Button type="submit" colorScheme="teal">
        Criar Curso
      </Button>
    </Box>
  );
};

export default CourseNew;
