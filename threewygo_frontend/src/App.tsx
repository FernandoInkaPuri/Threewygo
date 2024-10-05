import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';
import CourseList from './components/CourseList';
import Course from './components/Course';


function App() {
  return (
    <Router>
      <Box p={4}>
        <Heading as="h1" size="lg" mb={4}>
          Cursos Ativos
        </Heading>
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/course/:id" element={<Course />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
