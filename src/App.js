import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation';
import NoteList from './components/NoteList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';
import Accidentes from './components/Accidentes';


function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/edit/:id" element={<CreateNote />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/user" element={<CreateUser />} />
        <Route path="/auspiciantes" element={<Accidentes />} /> {/* Ruta incorrecta */}
      </Routes>
    </Router>
  );
}

export default App;
