/* eslint-disable no-ex-assign */
import { Box, Typography, Stack, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useState } from 'react';
import { useDrawerContext } from '../../../contexts/DrawerContext';
import { getItem } from '../../../utils/storage';
import Input from '../../Input';
import Button from '../../Button';
import api from '../../../services/api';
import { handleInputValueToBRL, handleBRLToValue, handleValueToBRL } from '../../../utils/formatters';
import { format } from 'date-fns';

export default function ChargeForm() {
    const {
        setShowChargeModal,
        setFeedbackModal,
        clientData,
        chargeEditMode,
        chargeData,
        handleCloseChargeModal
    } = useDrawerContext();
    const token = getItem('token');
    const blankForm = {
        nome: clientData.nome,
        descricao: '',
        status: 'Paga',
        valor: '',
        vencimento: '',
    };
    const [form, setForm] = useState(
        chargeEditMode
            ? {
                nome: chargeData.nome || clientData.nome,
                descricao: chargeData.descricao,
                status: chargeData.status === 'Vencida' || chargeData.status === 'Pendente' ? 'Pendente' : 'Paga',
                valor: handleValueToBRL(chargeData.valor),
                vencimento: format(new Date(chargeData.vencimento), 'yyyy-MM-dd'),
            }
            : { ...blankForm }
    );
    const inputData = [
        { label: 'Nome*', type: 'text', placeholder: 'Digite seu nome', error: '' },
        { label: 'Descrição*', type: 'text', placeholder: 'Digite a descrição', error: '' },
        { label: 'Vencimento*', type: 'date', placeholder: 'Data de Vencimento', error: '' },
        { label: 'Valor*', type: 'money', placeholder: 'Digite o valor', error: '' }
    ];
    const [inputProps, setInputProps] = useState([...inputData]);
    const buttonProps = [
        { label: 'Cancelar', type: 'button', class: 'button cancelButton' },
        { label: 'Aplicar', type: 'submit', class: 'button' }
    ];
    const boxPaddingBotton = '0.5rem';

    function handleInput(e) {
        return setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleChangeRadioBtn(e) {
        setForm({ ...form, status: e.target.value });
    }

    function handleInputErrors(index, error) {
        const inputError = [...inputData];
        inputError[index].error = error;
        setInputProps([...inputError]);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let error = '';

        if (!form.descricao) {
            error = 'Este campo deve ser preenchido';
            return handleInputErrors(1, error);
        }
        if (!form.vencimento) {
            error = 'Este campo deve ser preenchido';
            return handleInputErrors(2, error);
        }
        if (!form.valor) {
            error = 'Este campo deve ser preenchido';
            return handleInputErrors(3, error);
        }
        const formValor = handleBRLToValue(form.valor);
        if (formValor < 1) {
            error = 'O valor mínimo é de R$ 0,01';
            return handleInputErrors(3, error);
        }

        const dataSent = {
            ...form,
            vencimento: new Date(`${form.vencimento}T03:00`),
            valor: formValor,
        };

        const headerSent = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }

        try {
            chargeEditMode
                ? await api.put(`cobranca/${Number(chargeData.id)}`, dataSent, headerSent)
                : await api.post(`cobranca/cliente/${Number(clientData.id)}`, dataSent, headerSent);
            setShowChargeModal(false);

            const feedbackMessage = `Cobrança ${chargeEditMode ? 'editada' : 'cadastrada'} com sucesso!`;
            setFeedbackModal({ show: true, success: true, message: feedbackMessage });

        } catch (error) {
            console.log(error)
            setFeedbackModal({ show: true, success: false, message: error.response.statusText });
        }
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
                {chargeEditMode ? 'Edição de Cobrança' : 'Cadastro de Cobrança'}
            </Typography>
            <Input
                name='nome'
                value={form.nome}
                handleInput={handleInput}
                inputProps={inputProps[0]}
                height='44px'
                boxPb={boxPaddingBotton}
                readOnly={true}
            />
            <Input
                name='descricao'
                value={form.descricao}
                handleInput={handleInput}
                inputProps={inputProps[1]}
                height='88px'
                multiline={true}
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
                        name='vencimento'
                        value={form.vencimento}
                        handleInput={handleInput}
                        inputProps={inputProps[2]}
                        height='44px'
                        boxPb={boxPaddingBotton}
                    />
                </Stack>
                <Stack width='22.4rem'>
                    <Input
                        name='valor'
                        value={form.valor}
                        handleInput={handleInput}
                        inputProps={inputProps[3]}
                        height='44px'
                        boxPb={boxPaddingBotton}
                        onKeyUp={(e) =>
                            setForm({ ...form, [e.target.name]: handleInputValueToBRL(e) })
                        }
                    />
                </Stack>
            </Stack>
            <Stack width='100%' mb={17}>
                <Typography className='nunito fw600 fs14 lh20' mb={1}>
                    Status*
                </Typography>
                <RadioGroup
                    defaultValue="Paga"
                    value={form.status}
                    onChange={handleChangeRadioBtn}
                >
                    <Box
                        height='48px'
                        display='flex'
                        alignItems='center'
                        bgcolor='#F0F0F5'
                        borderRadius='10px'
                        mb='8px'
                    >
                        <FormControlLabel
                            value='Paga'
                            control={<Radio color='secondary' />}
                            sx={{ marginLeft: '3px' }}
                            label='Cobrança Paga'
                        />
                    </Box>
                    <Box
                        height='48px'
                        display='flex'
                        alignItems='center'
                        bgcolor='#F0F0F5'
                        borderRadius='10px'
                    >
                        <FormControlLabel
                            value='Pendente'
                            control={<Radio color='secondary' />}
                            sx={{ marginLeft: '3px' }}
                            label='Cobranças Pendentes'
                        />
                    </Box>
                </RadioGroup>
            </Stack>
            <Box width='48.7rem' height='3.3rem' mt='2rem' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box width='23.3rem'>
                    <Button
                        buttonProps={buttonProps[0]}
                        onClick={handleCloseChargeModal}
                    />
                </Box>
                <Box width='23.3rem'>
                    <Button
                        buttonProps={buttonProps[1]}
                    />
                </Box>
            </Box>
        </Stack >
    )
}