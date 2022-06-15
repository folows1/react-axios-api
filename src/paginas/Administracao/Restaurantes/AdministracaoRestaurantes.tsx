import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IRestaurante from '../../../interfaces/IRestaurante';
import { Grid, IconButton, Link, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import http from '../../../http';

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>()
  useEffect(() => {
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
  }, [])


  const remover = (restaurante:IRestaurante) => {
    http.delete(`restaurantes/${restaurante.id}/`)
      .then(() => {
        if (restaurantes) {         
          setRestaurantes([
            ...restaurantes.filter(x => x.id !== restaurante.id)
          ])
        }
      })
  }
  return (
    <>
      <Grid container>
        <Grid item xs>
          <Typography component="h1" variant="h6">
            Restaurantes
          </Typography>
        </Grid>
        <Grid item>
          <Link
            variant="button"
            component={RouterLink}
            to="/admin/restaurantes/novo"
          >
            Novo
          </Link>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell colSpan={2}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantes?.map((restaurante) => (
              <TableRow key={restaurante.id}>
                <TableCell>
                  {restaurante.nome}
                </TableCell>
                <TableCell>
                  <Link
                    variant="button"
                    component={RouterLink}
                    to={`/admin/restaurantes/${restaurante.id}`}
                  >
                    <IconButton aria-label="editar">
                      <Edit />
                    </IconButton>
                  </Link>
                  <IconButton aria-label="deletar" onClick={() => remover(restaurante)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdministracaoRestaurantes;