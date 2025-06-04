import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Usuarios from './components/Usuarios';
import Dados from './components/Dados';

// Tema do Material UI
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Redireciona a rota raiz para /usuarios */}
          <Route path="/" element={<Navigate to="/usuarios" replace />} />
          
          {/* Rota para listar usuários */}
          <Route path="/usuarios" element={<Usuarios />} />
          
          {/* Rota para dados detalhados do usuário */}
          <Route path="/dados/:id" element={<Dados />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;