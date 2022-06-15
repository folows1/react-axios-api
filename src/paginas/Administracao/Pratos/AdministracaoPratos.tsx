import { Paper, TableCell, TableContainer, TableHead, TableRow, Table, TableBody, IconButton, Link, Grid, Typography } from "@mui/material";
import { Delete, Edit } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([]);


    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(response => {
                setPratos(response.data);
            })
    }, [])

    const excluirPrato = (pratoE: IPrato) => {
        http.delete(`pratos/${pratoE.id}/`)
            .then(() => {
                const novaLista = pratos.filter(prato => prato.id !== pratoE.id);
                setPratos([...novaLista]);
            })
    }

    return (
        <>
            <Grid container>
                <Grid item xs>
                    <Typography component="h1" variant="h6">
                        Pratos
                    </Typography>
                </Grid>
                <Grid item>
                    <Link
                        variant="button"
                        component={RouterLink}
                        to="/admin/pratos/novo">
                        Novo
                    </Link>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                Tag
                            </TableCell>
                            <TableCell>
                                Imagem
                            </TableCell>
                            <TableCell colSpan={2}>Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {pratos.map(prato => <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                {prato.tag}
                            </TableCell>
                            <TableCell>
                                [ <a href={prato.imagem} target="_black" rel="noreferrer">ver</a> ]
                            </TableCell>
                            <TableCell>
                                <Link
                                    variant="button"
                                    component={RouterLink}
                                    to={`/admin/pratos/${prato.id}`}
                                >
                                    <IconButton aria-label="editar">
                                        <Edit />
                                    </IconButton>
                                </Link>
                                <IconButton aria-label="deletar" onClick={() => excluirPrato(prato)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>

            </TableContainer>
        </>
    );
}

export default AdministracaoPratos;