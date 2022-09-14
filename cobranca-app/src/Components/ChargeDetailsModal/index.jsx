import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import { useDrawerContext } from '../../contexts/DrawerContext';
import DataDisplay from '../DataDisplay';
import closeIcon from '../../assets/close-icon.png';
import unfocusChargesIcon from '../../assets/unfocus-charges-icon.png';
import ChargeStatus from '../ChargeStatus';
import { handleValueToBRL } from '../../utils/formatters';
import './styles.css';

export default function ChargeDetailsModal() {
    const { setShowChargeDetails, chargeData, clientData } = useDrawerContext();

    function handleCloseClick() {
        setShowChargeDetails(false);
    }
    return (
        <div className='chargeDetailsModal__container'>
            <div className='chargeDetailsModal__card'>
                <img
                    className='chargeDetailsModal__close-icon'
                    src={closeIcon} alt='Fechar'
                    onClick={handleCloseClick}
                />
                <Box
                    height='100%'
                    width='100%'
                >
                    <Stack
                        width='100%'
                        direction='row'
                        alignItems='center'
                        mb='1.6rem'
                    >
                        <Box
                            component='img'
                            src={unfocusChargesIcon}
                            alt='detalhe cobrança'
                            height='3.2rem'
                            mr='2rem'
                        />
                        <Typography
                            className='montserrat fw600 fs26 lh130p'
                        >
                            Detalhe da Cobrança
                        </Typography>
                    </Stack>
                    <Box
                        mb='2.4rem'
                    >
                        <DataDisplay
                            label='Nome'
                            data={chargeData.nome || clientData.nome}
                        />
                    </Box>
                    <Box
                        mb='2.4rem'
                    >
                        <Typography
                            className='nunito fw700 fs16 lh24'
                            width='95%'
                            overflow='hidden'
                            mb='0.8rem'
                            sx={{ color: '#3F3F55' }}
                        >
                            Descrição
                        </Typography>
                        <Typography
                            className='nunito fw400 fs16 lh24'
                            width='100%'
                            pr='0.8rem'
                            height='6.3rem'
                            sx={{
                                color: '#3F3F55',
                                overflowX: 'hidden',
                                overflowY: 'auto',
                            }}
                        >
                            {chargeData.descricao}
                        </Typography>
                    </Box>
                    <Stack
                        direction='row'
                        mb='2.4rem'
                    >
                        <Box
                            width='50%'
                        >
                            <DataDisplay
                                label='Vencimento'
                                data={format(new Date(chargeData.vencimento), 'dd/MM/yyyy')}
                            />
                        </Box>
                        <Box
                            width='50%'
                        >
                            <DataDisplay
                                label='Valor'
                                data={handleValueToBRL(chargeData.valor)}
                            />
                        </Box>
                    </Stack>
                    <Stack
                        direction='row'
                    >
                        <Box
                            width='50%'
                        >
                            <DataDisplay
                                label='ID Cobrança'
                                data={chargeData.id}
                            />
                        </Box>
                        <Box
                            width='50%'
                        >
                            <Typography
                                className='nunito fw700 fs16 lh24'
                                width='95%'
                                overflow='hidden'
                                mb='0.8rem'
                                sx={{ color: '#3F3F55' }}
                            >
                                Status
                            </Typography>
                            <Box>
                                <ChargeStatus
                                    status={chargeData.status}
                                    due={chargeData.vencimento}
                                />
                            </Box>
                        </Box>
                    </Stack>
                </Box>
            </div>
        </div>
    )
}