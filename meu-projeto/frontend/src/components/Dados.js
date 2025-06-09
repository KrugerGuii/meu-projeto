import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Box,
  Chip,
  Divider,
  Button
} from '@mui/material';
import { Person, Email, Phone, Business, ArrowBack } from '@mui/icons-material';

const Dados = () => {
  const { id } = useParams(); // Extrai o ID da URL
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsuario();
  },);

  const fetchUsuario = async () => {
    try {
      setLoading(true);
      // Fazendo requisição para a API do backend via Docker
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/usuarios/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Usuário não encontrado');
        }
        throw new Error('Erro ao buscar dados do usuário');
      }
      
      const data = await response.json();
      setUsuario(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    window.close(); // Fecha a aba atual
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Carregando dados do usuário...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={handleVoltar}
 l         startIcon={<ArrowBack />}
        >
          Fechar
        </Button>
      </Container>
    );
  }

  if (!usuario) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">
          Usuário não encontrado
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Dados do Usuário
        </Typography>
        <Button 
          variant="outlined" 
          onClick={handleVoltar}
          startIcon={<ArrowBack />}
        >

        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Person sx={{ fontSize: 60, color: 'primary.main', mr: 2 }} />
            <Box>
              <Typography variant="h5" component="h2" gutterBottom>
                {usuario.nome}
              </Typography>
              <Chip 
                label={`ID: ${usuario.id}`} 
                color="primary" 
                variant="outlined" 
                size="small"
              />
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Email sx={{ color: 'text.secondary', mr: 2 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {usuario.email}
                </Typography>
              </Box>
            </Box>

            {usuario.telefone && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ color: 'text.secondary', mr: 2 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Telefone
                  </Typography>
                  <Typography variant="body1">
                    {usuario.telefone}
                  </Typography>
                </Box>
              </Box>
            )}

            {usuario.empresa && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Business sx={{ color: 'text.secondary', mr: 2 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Empresa
                  </Typography>
                  <Typography variant="body1">
                    {usuario.empresa}
                  </Typography>
                </Box>
              </Box>
            )}

            {usuario.cidade && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Cidade
                  </Typography>
                  <Typography variant="body1">
                    {usuario.cidade}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {usuario.bio && (
            <>
              <Divider sx={{ my: 3 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Sobre
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {usuario.bio}
                </Typography>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dados;