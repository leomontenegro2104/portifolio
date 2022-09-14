/* eslint-disable no-ex-assign */
import { useState } from 'react';
import Input from '../../Input';
import Button from '../../Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import api from '../../../services/api';
import { getItem } from '../../../utils/storage';
import { useDrawerContext } from '../../../contexts/DrawerContext';
import { handleCPFToValue, handlePhoneToValue, handleValueToCPF, handleValueToPhone } from '../../../utils/formatters';

export default function UserModalForm() {
    const token = getItem('token');
    const {
        setShowClientModal,
        setFeedbackModal,
        clientEditMode,
        setClientEditMode,
        clientData,
        setClientData,
    } = useDrawerContext();

    const blankForm = {
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        endereco: '',
        complemento: '',
        cep: '',
        bairro: '',
        cidade: '',
        uf: '',
        usuario_id: Number(localStorage.getItem('userId'))
    };

    const [form, setForm] = useState(clientEditMode
        ? {
            ...clientData,
            cpf: handleValueToCPF(clientData.cpf),
            telefone: handleValueToPhone(clientData.telefone),
        }
        : { ...blankForm });

    const inputData = [
        { label: 'Nome*', type: 'text', placeholder: 'Digite seu nome', error: '' },
        { label: 'E-mail*', type: 'email', placeholder: 'Digite seu e-mail', error: '' },
        { label: 'CPF*', type: 'text', placeholder: 'Digite seu CPF', error: '' },
        { label: 'Telefone*', type: 'tel', placeholder: 'Digite seu Telefone', error: '' },
        { label: 'Endereço', type: 'text', placeholder: 'Digite o endereço', error: '' },
        { label: 'Complemento', type: 'text', placeholder: 'Digite o complemento', error: '' },
        { label: 'CEP', type: 'text', placeholder: 'Digite o CEP', error: '' },
        { label: 'Bairro', type: 'text', placeholder: 'Digite o bairro', error: '' },
        { label: 'Cidade', type: 'text', placeholder: 'Digite a cidade', error: '' },
        { label: 'UF', type: 'text', placeholder: 'Digite a UF', error: '' }
    ];
    const [inputProps, setInputProps] = useState([...inputData]);
    const buttonProps = [
        { label: 'Cancelar', type: 'button', class: 'button cancelButton' },
        { label: 'Aplicar', type: 'submit', class: 'button' }
    ];
    const boxPaddingBotton = '0.5rem';

    function handleInput(e) {

        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.name === 'cep' && e.target.value !== '') {
            if (!parseInt(e.target.value) || e.target.value.length > 8) {
                const error = 'CEP inválido';
                return handleInputErrors(6, error);
            }

            const promisse = fetch(`https://viacep.com.br/ws/${e.target.value}/json/`);
            promisse.then((resposta) => {
                const promisseBody = resposta.json();

                promisseBody.then((body) => {
                    setForm({
                        ...form,
                        cep: e.target.value,
                        endereco: body.logradouro,
                        complemento: body.complemento,
                        bairro: body.bairro,
                        cidade: body.localidade,
                        uf: body.uf
                    });
                })
            })
        }
        setInputProps([...inputData]);
        return
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
        if (!form.cpf) {
            error = 'Este campo deve ser preenchido';
            return handleInputErrors(2, error);
        }
        if (!parseInt(form.cpf) || form.cpf.length !== 14) {
            error = 'CPF inválido';
            return handleInputErrors(2, error);
        }
        if (!form.telefone) {
            error = 'Este campo deve ser preenchido';
            return handleInputErrors(3, error);
        }
        if (form.telefone.length < 13 || form.telefone.length > 15) {
            error = 'Telefone inválido';
            return handleInputErrors(3, error);
        }

        const client = {
            ...form,
            cpf: handleCPFToValue(form.cpf),
            telefone: handlePhoneToValue(form.telefone),
        }
        const header = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }

        try {
            let feedbackMessage = clientEditMode ? 'Edições do cadastro concluídas com sucesso' : 'Cadastro concluído com sucesso';

            if (clientEditMode) {
                await api.put(`clientes/${form.id}`, client, header)
                setClientData({
                    ...client,
                    cpf: handleValueToCPF(client.cpf),
                    telefone: handleValueToPhone(client.telefone),
                })
            } else {
                await api.post('cliente', client, header);
            }

            setShowClientModal(false);
            setClientEditMode(false);
            setFeedbackModal({ show: true, success: true, message: feedbackMessage });

            // setInputProps([...inputData]);
        } catch (error) {
            console.log(error.response.data);
            const wordsError = ((error.response.data).toLowerCase()).split(' ');
            if (wordsError.includes('email') || wordsError.includes('e-mail')) {
                if (error.response.data === 'email deve ser um email válido') {
                    error = 'E-mail inválido';
                    return handleInputErrors(1, error);
                }
                error = error.response.data;
                return handleInputErrors(1, error);
            }
            if (wordsError.includes('cpf')) {
                error = error.response.data;
                return handleInputErrors(2, error);
            }
            if (wordsError.includes('telefone')) {
                error = error.response.data;
                return handleInputErrors(3, error);
            }
        }
    }

    function handleCloseClick() {
        setShowClientModal(false);
        setClientEditMode(false);
        setInputProps([...inputData]);
    }

    return (
        <Stack
            component='form'
            onSubmit={handleSubmit}
            width='48.7rem'
            direction='column'
            alignItems='center'
        >
            <Typography
                className='montserrat fw700 fs24 lh130p'
                align='center'
                mb='1.75rem'
                sx={{ color: '#343447' }}
            >
                {clientEditMode ? 'Editar Cliente' : 'Cadastro do Cliente'}
            </Typography>
            <Input
                name='nome'
                value={form.nome}
                handleInput={handleInput}
                inputProps={inputProps[0]}
                height='44px'
                boxPb={boxPaddingBotton}
            />
            <Input
                name='email'
                value={form.email}
                handleInput={handleInput}
                inputProps={inputProps[1]}
                height='44px'
                boxPb={boxPaddingBotton}
            />
            <Stack
                component='div'
                width='48.7rem'
                direction='row'
                alignItems='flex-start'
                justifyContent='space-between'
            >
                <Stack width='23.5rem'>
                    <Input
                        name='cpf'
                        value={form.cpf}
                        handleInput={handleInput}
                        inputProps={inputProps[2]}
                        height='44px'
                        boxPb={boxPaddingBotton}
                        onKeyUp={(e) =>
                            setForm({ ...form, [e.target.name]: handleValueToCPF(e.target.value) })
                        }
                    />
                </Stack>
                <Stack width='22.4rem'>
                    <Input
                        name='telefone'
                        value={form.telefone}
                        handleInput={handleInput}
                        inputProps={inputProps[3]}
                        height='44px'
                        boxPb={boxPaddingBotton}
                        onKeyUp={(e) =>
                            setForm({ ...form, [e.target.name]: handleValueToPhone(e.target.value) })
                        }
                    />
                </Stack>
            </Stack>
            <Input
                name='endereco'
                value={form.endereco}
                handleInput={handleInput}
                inputProps={inputProps[4]}
                height='44px'
                boxPb={boxPaddingBotton}
            />
            <Input
                name='complemento'
                value={form.complemento}
                handleInput={handleInput}
                inputProps={inputProps[5]}
                height='44px'
                boxPb={boxPaddingBotton}
            />
            <Stack
                component='div'
                width='48.7rem'
                direction='row'
                alignItems='flex-start'
                justifyContent='space-between'
            >
                <Stack width='22.8rem'>
                    <Input
                        name='cep'
                        value={form.cep}
                        handleInput={handleInput}
                        inputProps={inputProps[6]}
                        height='44px'
                        boxPb={boxPaddingBotton}
                    />
                </Stack>
                <Stack width='23.5rem'>
                    <Input
                        name='bairro'
                        value={form.bairro}
                        handleInput={handleInput}
                        inputProps={inputProps[7]}
                        height='44px'
                        boxPb={boxPaddingBotton}
                    />
                </Stack>
            </Stack>
            <Stack
                component='div'
                width='48.7rem'
                direction='row'
                alignItems='flex-start'
                justifyContent='space-between'
            >
                <Stack width='30.3rem'>
                    <Input
                        name='cidade'
                        value={form.cidade}
                        handleInput={handleInput}
                        inputProps={inputProps[8]}
                        height='44px'
                        boxPb={boxPaddingBotton}
                    />
                </Stack>
                <Stack width='16rem'>
                    <Input
                        name='uf'
                        value={form.uf}
                        handleInput={handleInput}
                        inputProps={inputProps[9]}
                        height='44px'
                        boxPb={boxPaddingBotton}
                    />
                </Stack>
            </Stack>
            <Box width='48.7rem' height='3.3rem' mt='2rem' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box width='23.3rem'>
                    <Button
                        buttonProps={buttonProps[0]}
                        onClick={handleCloseClick}
                    />
                </Box>
                <Box width='23.3rem'>
                    <Button
                        buttonProps={buttonProps[1]}
                    />
                </Box>
            </Box>
        </Stack>
    )
}