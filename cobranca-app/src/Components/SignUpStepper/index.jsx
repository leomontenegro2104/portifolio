import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import signUpOpen from '../../assets/signup-step-open-icon.svg';
import signUpDoing from '../../assets/signup-step-doing-icon.svg';
import signUpDone from '../../assets/signup-step-done-icon.svg';
import './styles.css';

export default function SignUpStepper({ step }) {

  return (
    <Grid container direction='column' width='clamp(10rem, 80%, 36rem)'>
      <Grid container direction='row' wrap='nowrap'>
        <Grid container direction='column' wrap='nowrap' width='3.2rem'>
          <Grid item width='3.2rem' minHeight='3.2rem' display='flex' justifyContent='center' alignItems='center'>
            <Box component='img' src={step > 0 ? signUpDone : signUpDoing} alt='primeiro passo' />
          </Grid>
          <Grid item width='3.2rem' height='100%' display='flex' justifyContent='center' alignItems='center'>
            <Box width='0.4rem' height='100%' sx={{ backgroundColor: '#0E8750' }} />
          </Grid>
        </Grid>
        <Grid minHeight='7.2rem' pl='1rem'>
          <Typography className='montserrat fw700 fs18 lh130p' sx={{ color: '#0E8750' }}>
            Cadastre-se
          </Typography>
          <Typography className='nunito fw600 fs18 lh130p'>
            Por favor, escreva seu nome e e-mail
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction='row' wrap='nowrap'>
        <Grid container direction='column' wrap='nowrap' width='3.2rem'>
          <Grid item width='3.2rem' minHeight='3.2rem' display='flex' justifyContent='center' alignItems='center'>
            <Box component='img' src={step >= 2 ? signUpDone : (step >= 1 ? signUpDoing : signUpOpen)} alt='segundo passo' />
          </Grid>
          <Grid item width='3.2rem' height='100%' display='flex' justifyContent='center' alignItems='flex-start'>
            <Box width='0.4rem' height='100%' sx={{ backgroundColor: '#0E8750' }} />
          </Grid>
        </Grid>
        <Grid minHeight='7.2rem' pl='1rem'>
          <Typography className='montserrat fw700 fs18 lh130p' sx={{ color: '#0E8750' }}>
            Escolha uma senha
          </Typography>
          <Typography className='nunito fw600 fs18 lh130p'>
            Escolha uma senha segura
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction='row' wrap='nowrap'>
        <Grid container direction='column' width='3.2rem'>
          <Grid item width='3.2rem' minHeight='3.2rem' display='flex' justifyContent='center' alignItems='flex-start'>
            <Box component='img' src={step >= 2 ? signUpDone : signUpOpen} alt='terceiro passo' />
          </Grid>
        </Grid>
        <Grid minHeight='7.2rem' pl='1rem'>
          <Typography className='montserrat fw700 fs18 lh130p' sx={{ color: '#0E8750' }}>
            Cadastro realizado com sucesso
          </Typography>
          <Typography className='nunito fw600 fs18 lh130p'>
            E-mail e senha cadastrados com sucesso
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
