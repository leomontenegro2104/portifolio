import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import api from '../../services/api';
import Link from '@mui/material/Link';
import { setItem } from '../../utils/storage';
import './styles.css';

export default function SignIn() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', senha: '' });

    const inputData = [
        { label: 'E-mail', type: 'text', placeholder: 'Digite seu e-mail', error: '', adornment: false, showPassword: false },
        { label: 'Senha', type: 'password', placeholder: 'Digite sua senha', error: '', adornment: true, showPassword: false }
    ];

    const [inputProps, setInputProps] = useState([...inputData]);

    const buttonProps = [
        { label: 'Entrar', type: 'submit', class: 'button' }
    ]

    function handleInput(e) {
        setInputProps([...inputData]);
        return setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleInputErrors(index, error) {
        const inputError = [...inputData];
        inputError[index].error = error;
        setInputProps([...inputError]);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let error = '';
        if (!form.email) {
            error = 'O campo E-mail é obrigatório';
            return handleInputErrors(0, error);
        }
        if (!form.senha) {
            error = 'O campo Senha é obrigatório';
            return handleInputErrors(1, error);
        }

        try {
            const dataSent = form;
            const response = await api.post('login/', dataSent);

            const { token, usuario } = response.data
            setItem('token', token)
            setItem('userId', usuario.id);
            setItem('userName', usuario.nome);

            navigate('/home');
        } catch (error) {
            // eslint-disable-next-line no-ex-assign
            error = 'E-mail e/ou Senha inválido(s)';
            return handleInputErrors(1, error)
        }
    }


    return (
        <Grid className='signin-grid' container wrap='wrap-reverse'>
            <Grid
                className='signin-grid__left' item xs={12} sm={4} >
                <Typography
                    className='montserrat fw600 fs24 lh130p'
                    sx={{ color: '#034A2A' }}
                >
                    Gerencie todos os pagamentos da sua empresa em um só lugar.
                </Typography>
            </Grid>
            <Grid
                className='signin-grid__right' item xs={12} sm={8}
                position='relative'
            >
                <Stack
                    component='form'
                    onSubmit={handleSubmit}
                    width='36.8rem'
                    mx='1rem'
                    direction='column'
                    alignItems='center'
                >
                    <Typography
                        className='montserrat fw700 fs24 lh130p'
                        align='center'
                        mb='3.2rem'
                        sx={{ color: '#343447' }}
                    >
                        Faça seu login!
                    </Typography>
                    <Input
                        name='email'
                        value={form.email}
                        handleInput={handleInput}
                        inputProps={inputProps[0]}
                    />
                    <Input
                        name='senha'
                        value={form.senha}
                        handleInput={handleInput}
                        inputProps={inputProps[1]} />
                    <Box width='16rem' height='3.3rem' mt='2rem'>
                        <Button
                            buttonProps={buttonProps[0]}
                        />
                    </Box>
                    <Typography
                        className='nunito fw400 fs18 lh130p'
                        mt='1.5rem'
                        sx={{ color: '#3F3F55' }}
                    >
                        {'Ainda não possui uma conta? '}
                        <Link
                            href='/signup'
                            color='#DA0175'
                        >
                            Cadastre-se
                        </Link>
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    )
}