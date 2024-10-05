import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import CourseList from './components/CourseList';
import Course from './components/Course';
import CourseNew from './components/CourseNew';
import CourseEdit from './components/CourseEdit';
import Header from './components/Header';


function App() {
  return (
    <Router>
      <Header />
      <Box p={4}>
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
