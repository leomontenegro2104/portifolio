import { Typography } from '@mui/material';
import { Box } from "@mui/system";
import clientNotFounded from '../../assets/client-not-founded.png';
import searchNotFounded from '../../assets/not-founded-search.png';

export default function NotFoundModal() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '475px',
                backgroundColor: '#FFF',
                position: 'relative',
                bottom: '540px',
                zIndex: '1',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute' }}>
                <Box sx={{ position: 'relative', top: '50px', left: '180px' }}>
                    <img src={clientNotFounded} alt='Pessoa não encontrada' />
                </Box>
                <Box mb={4}>
                    <img src={searchNotFounded} alt='Lupa quebrada' />
                </Box>
                <Typography className='montserrat fw600 fs28 lh34' sx={{ color: '#F08889' }} mb={2}>Nenhum resultado foi encontrado!</Typography>
                <Typography className='montserrat fw600 fs24 lh29' sx={{ color: '#9B9BB2' }}>Verifique se a escrita está correta</Typography>
            </Box>
        </Box>
    )
}