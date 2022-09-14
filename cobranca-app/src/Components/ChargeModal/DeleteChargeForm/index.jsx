import { Box, Typography, Stack, } from '@mui/material';
import { useDrawerContext } from '../../../contexts/DrawerContext';
import { getItem } from '../../../utils/storage';
import Button from '../../Button';
import api from '../../../services/api';
import { compareAsc } from 'date-fns';
import warningIcon from '../../../assets/warning-icon.svg';


export default function DeleteChargeForm() {
    const {
        chargeData,
        handleCloseChargeModal,
        setFeedbackModal,
    } = useDrawerContext();
    const token = getItem('token');

    const buttonProps = [
        { label: 'Não', type: 'button', class: 'button noButton' },
        { label: 'Sim', type: 'submit', class: 'button yesButton' }
    ];

    async function handleSubmit(e) {
        e.preventDefault();
        const today = new Date();
        const vencimento = new Date(chargeData.vencimento);
        let feedbackMessage = '';

        if (chargeData.status === 'Paga' || (compareAsc(vencimento, today) < 0)) {
            feedbackMessage = 'Esta cobrança não pode ser excluída!';
            setFeedbackModal({ show: true, success: false, message: feedbackMessage });
            return handleCloseChargeModal();
        }

        const header = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }

        try {
            await api.delete(`cobranca/${Number(chargeData.id)}`, header);
            feedbackMessage = 'Cobrança excluída com sucesso!';
            handleCloseChargeModal();
            setFeedbackModal({ show: true, success: true, message: feedbackMessage });
            return;
        } catch (error) {
            setFeedbackModal({ show: true, success: false, message: error.response.data });
        }
    }

    return (
        <Stack
            component='form'
            onSubmit={handleSubmit}
            width='48.7rem'
            height='32.6rem'
            direction='column'
            alignItems='center'
        >
            <Box
                width='15rem'
                height='15rem'
                mt='5rem'
                component='img'
                src={warningIcon}
                alt='Atenção'
            />
            <Typography
                className='montserrat fw600 fs18 lh130p'
                align='center'
                mb='2.6rem'
                sx={{ color: '#CC7800' }}
            >
                Tem certeza que deseja excluir esta cobrança?
            </Typography>
            <Box width='21.6rem' height='2.4rem' display='flex' justifyContent='space-between'>
                <Box width='10rem'>
                    <Button
                        buttonProps={buttonProps[0]}
                        onClick={handleCloseChargeModal}
                    />
                </Box>
                <Box width='10rem'>
                    <Button
                        buttonProps={buttonProps[1]}
                    />
                </Box>
            </Box>
        </Stack >
    )
}
