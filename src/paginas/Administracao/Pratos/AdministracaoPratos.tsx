import { Paper, TableCell, TableContainer, TableHead, TableRow, Table, TableBody, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
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
                            [ <Link to={`/admin/pratos/${prato.id}`}>editar</Link> ]
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color='error'
                                onClick={() => excluirPrato(prato)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>

        </TableContainer>
    );
}

export default AdministracaoPratos;