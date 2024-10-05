import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';
import CourseList from './components/CourseList';
import Course from './components/Course';
import CourseNew from './components/CourseNew';
import CourseEdit from './components/CourseEdit';

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
          <Route path="/create" element={<CourseNew />} />
          <Route path="/course/edit/:id" element={<CourseEdit />} /> 
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
