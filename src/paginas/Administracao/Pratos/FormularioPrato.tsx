import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";

const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);
    const [tag, setTag] = useState('');
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [restaurante, setRestaurante] = useState('');
    const [imagem, setImagem] = useState<File | null>(null)

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            http.get<IPrato>(`pratos/${params.id}/`)
                .then(resposta => {
                    setNomePrato(resposta.data.nome);
                    setDescricao(resposta.data.descricao);
                    setTag(resposta.data.tag);
                    setImagem(null);
                    setRestaurante(resposta.data.restaurante.toString());
                })
        }
    }, [params])



    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags));

        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data));
    }, []);

    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('nome', nomePrato);
        formData.append('descricao', descricao);
        formData.append('tag', tag);
        formData.append('restaurante', restaurante);
        if (imagem) {
            formData.append('imagem', imagem);
        }
        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        }).then(() => {
            limparForm();
            alert('Prato cadastrado com sucesso!');
        }).catch(() => {
            alert('Erro ao cadastrar prato!');
        });

    }

    const limparForm = () => {
        setNomePrato('');
        setDescricao('');
        setTag('');
        setRestaurante('');
        setImagem(null);
    };

    const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImagem(event.target.files[0]);
        } else {
            setImagem(null);
        }
    }

    return (

        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            flexGrow: 1
        }}>
            <Typography component='h1' variant='h6'>
                Formulário de Pratos
            </Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField id='nomeR' label='Nome do Prato'
                    variant="standard"
                    fullWidth
                    margin="dense"
                    required
                    value={nomePrato}
                    onChange={event => setNomePrato(event.target.value)} />
                <TextField id='descricao' label='Descrição do Prato'
                    variant="standard"
                    fullWidth
                    margin="dense"
                    required
                    value={descricao}
                    onChange={event => setDescricao(event.target.value)} />

                <FormControl
                    margin="dense"
                    fullWidth>
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={event => setTag(event.target.value)}>
                        {tags.map(tag =>
                            <MenuItem value={tag.value} key={tag.id}>
                                {tag.value}
                            </MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl
                    margin="dense"
                    fullWidth>
                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={event => setRestaurante(event.target.value)}>
                        {restaurantes.map(restaurante =>
                            <MenuItem value={restaurante.id} key={restaurante.id}>
                                {restaurante.nome}
                            </MenuItem>)}
                    </Select>
                </FormControl>

                <input type="file" onChange={selecionarArquivo} />

                <Button sx={{ marginTop: 1 }}
                    variant="outlined" type="submit" fullWidth>
                    Salvar
                </Button>
            </Box>
        </Box>

    )
}

export default FormularioPrato;