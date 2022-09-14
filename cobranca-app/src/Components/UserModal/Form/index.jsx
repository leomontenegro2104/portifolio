/* eslint-disable no-ex-assign */
import { useState, useEffect } from 'react';
import Input from '../../Input';
import Button from '../../Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import api from '../../../services/api';
import { getItem } from '../../../utils/storage';
import { useDrawerContext } from '../../../contexts/DrawerContext';
import { handleValueToCPF, handleValueToPhone } from '../../../utils/formatters';

export default function UserModalForm() {
    const {
        showUserModal,
        setShowUserModal,
        setShowUserSuccessMessage
    } = useDrawerContext();
    const [form, setForm] = useState(
        {
            nome: '',
            email: '',
            cpf: '',
            telefone: '',
            senha: '',
            repitaSenha: ''
        }
    );
    const inputData = [
        { label: 'Nome*', type: 'text', placeholder: 'Digite seu nome', error: '' },
        { label: 'E-mail*', type: 'email', placeholder: 'Digite seu e-mail', error: '' },
        { label: 'CPF', type: 'text', placeholder: 'Digite seu CPF', error: '' },
        { label: 'Telefone', type: 'tel', placeholder: 'Digite seu Telefone', error: '' },
        { label: 'Senha*', type: 'password', placeholder: 'Digite uma senha', error: '', adornment: true, showPassword: false },
        { label: 'Repita a senha*', type: 'password', placeholder: 'Digite uma senha', error: '', adornment: true, showPassword: false }
    ];
    const [inputProps, setInputProps] = useState([...inputData]);
    const buttonProps = [{ label: 'Continuar', type: 'submit', class: 'button' }];
    const token = getItem('token');

    async function loadUser() {
        try {
            const response = await api.get('usuario/',
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            setForm({
                ...form,
                nome: response.data.nome,
                email: response.data.email,
                cpf: response.data.cpf ? response.data.cpf : '',
                telefone: response.data.telefone ? response.data.telefone : ''
            });
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        setInputProps([...inputData]);
        loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showUserModal]);

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
        if (!form.nome) {
            error = 'Este campo deve ser preenchido';
            return handleInputErrors(0, error);
        }
        if (!form.email) {
            error = 'Este campo deve ser preenchido';
            return handleInputErrors(1, error);
        }
        if (!form.senha) {
            error = 'Este campo deve ser preenchido';
            return handleInputErrors(4, error);
        }
        if ((form.cpf.trim().length !== 0 && !parseInt(form.cpf)) || (form.cpf.trim().length !== 0 && form.cpf.trim().length !== 14)) {
            error = 'CPF inválido';
            return handleInputErrors(2, error);
        }
        if ((form.telefone.trim().length !== 0 && !parseInt(form.telefone)) || (form.telefone.trim().length !== 0 && form.telefone.trim().length !== 11)) {
            error = 'Telefone inválido';
            return handleInputErrors(3, error);
        }
        if (form.senha.trim().length < 6 || form.senha.trim().length > 20) {
            error = 'A Senha tem que ter entre 6 e 20 caracteres';
            return handleInputErrors(4, error);
        }
        if (!form.repitaSenha) {
            error = 'Este campo deve ser preenchido';
            return handleInputErrors(5, error);
        }
        if (form.repitaSenha !== form.senha) {
            error = 'As senhas não coincidem';
            return handleInputErrors(5, error);
        }

        const dataSent = {
            nome: form.nome.trim(),
            email: form.email.trim(),
            cpf: form.cpf.trim(),
            telefone: form.telefone.trim(),
            senha: form.senha.trim()
        };
        console.log(dataSent);
        const headerSent = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }

        try {
            await api.put('usuario', dataSent, headerSent);
            setShowUserModal(false);
            setInputProps([...inputData]);
            setShowUserSuccessMessage(true);
        } catch (error) {
            const wordsError = ((error.response.data).toLowerCase()).split(' ');
            if (wordsError.includes('e-mail') || wordsError.includes('email')) {
                error = 'E-mail inválido';
                return handleInputErrors(1, error);
            }
            if (wordsError.includes('cpf')) {
                error = 'CPF inválido ou já cadastrado';
                return handleInputErrors(2, error);
            }
            if (wordsError.includes('telefone')) {
                error = 'Telefone inválido';
                return handleInputErrors(3, error);
            }
            if (wordsError.includes('senhas')) {
                error = 'Senha inválido';
                return handleInputErrors(5, error);
            }
        }
    }

    return (
        <Stack
            component='form'
            onSubmit={handleSubmit}
            width='37.9rem'
            direction='column'
            alignItems='center'
        >
            <Typography
                className='montserrat fw700 fs24 lh130p'
                align='center'
                mb='3.2rem'
                sx={{ color: '#343447' }}
            >
                Edite seu cadastro
            </Typography>
            <Input
                name='nome'
                value={form.nome}
                handleInput={handleInput}
                inputProps={inputProps[0]}
                height='44px'
            />
            <Input
                name='email'
                value={form.email}
                handleInput={handleInput}
                inputProps={inputProps[1]}
                height='44px'
            />
            <Stack
                component='div'
                width='36.8rem'
                direction='row'
                alignItems='flex-start'
                justifyContent='space-between'
            >
                <Stack width='17.8rem'>
                    <Input
                        name='cpf'
                        value={form.cpf}
                        handleInput={handleInput}
                        inputProps={inputProps[2]}
                        height='44px'
                        onKeyUp={(e) =>
                            setForm({ ...form, [e.target.name]: handleValueToCPF(e.target.value) })
                        }
                    />
                </Stack>
                <Stack width='17.8rem'>
                    <Input
                        name='telefone'
                        value={form.telefone}
                        handleInput={handleInput}
                        inputProps={inputProps[3]}
                        height='44px'
                        onKeyUp={(e) =>
                            setForm({ ...form, [e.target.name]: handleValueToPhone(e.target.value) })
                        }
                    />
                </Stack>
            </Stack>
            <Input
                name='senha'
                value={form.senha}
                handleInput={handleInput}
                inputProps={inputProps[4]}
                height='44px'
            />
            <Input
                name='repitaSenha'
                value={form.repitaSenha}
                handleInput={handleInput}
                inputProps={inputProps[5]}
                height='44px'
            />
            <Box width='16rem' height='3.3rem' mt='2rem'>
                <Button
                    buttonProps={buttonProps[0]}
                />
            </Box>
        </Stack>
    )
}