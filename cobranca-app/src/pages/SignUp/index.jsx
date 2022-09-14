import { useState } from 'react';
import Grid from '@mui/material/Grid';
import SignUpStepper from '../../Components/SignUpStepper';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import api from '../../services/api';
import iconSuccess from '../../assets/icon-success.svg';
import Link from '@mui/material/Link';
import './styles.css';
import MiniStepper from '../../Components/MiniStepper';

export default function SignUp() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ nome: '', email: '', senha: '', repitaSenha: '' });

  const inputData = [
    { label: 'Nome*', type: 'text', placeholder: 'Digite seu nome', error: '', adornment: false },
    { label: 'E-mail*', type: 'email', placeholder: 'Digite seu e-mail', error: '', adornment: false },
    { label: 'Senha*', type: 'password', placeholder: 'Digite uma senha', error: '', adornment: true },
    { label: 'Repita a senha*', type: 'password', placeholder: 'Digite novamente a senha', error: '', adornment: true }
  ];

  const [inputProps, setInputProps] = useState([...inputData]);

  const buttonProps = [
    { label: 'Continuar', type: 'submit', class: 'button' },
    { label: 'Finalizar Cadastro', type: 'submit', class: 'button' },
    { label: 'Ir para Login', type: 'button', class: 'button' }
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

  async function handleFirstStep(e) {
    e.preventDefault();
    let error = '';
    if (!form.nome.trim()) {
      error = 'O campo Nome é obrigatório';
      return handleInputErrors(0, error);
    }
    if (!form.email) {
      error = 'O campo E-mail é obrigatório';
      return handleInputErrors(1, error);
    }
    try {
      await api.post('email', { email: form.email });
      return setStep(1);
    } catch (error) {
      const errorMessage = error.response.data || 'Um erro aconteceu, tente novamente!'
      return handleInputErrors(1, errorMessage);
    }
  }

  async function handleSecondStep(e) {
    e.preventDefault();
    let error = '';
    if (!form.senha) {
      error = 'O campo Senha é obrigatório';
      return handleInputErrors(2, error);
    }
    if (form.senha.trim().length < 6 || form.senha.trim().length > 20) {
      error = 'A Senha tem que ter entre 6 e 20 caracteres';
      return handleInputErrors(2, error);
    }
    if (form.senha !== form.repitaSenha) {
      error = 'As senhas devem ser iguais';
      return handleInputErrors(3, error);
    }
    try {
      await api.post('usuario', { ...form });
      return setStep(2);

    } catch (error) {
      return
    }
  }

  return (
    <Grid className='signup-grid' container wrap='wrap-reverse'>
      <Grid
        className='signup-grid__left' item xs={12} sm={4} >
        <SignUpStepper step={step} />
      </Grid>
      <Grid
        className='signup-grid__right' item xs={12} sm={8}
        position='relative'
      >
        {step === 0 &&
          <Stack
            component='form'
            onSubmit={(e) => handleFirstStep(e)}
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
              Adicione seus dados
            </Typography>
            <Input
              name='nome'
              value={form.nome}
              handleInput={handleInput}
              inputProps={inputProps[0]}
            />
            <Input
              name='email'
              value={form.email}
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
              {'Já possui uma conta? Faça seu '}
              <Link
                href='/'
                color='#DA0175'
              >
                Login
              </Link>
            </Typography>
          </Stack>
        }
        {step === 1 &&
          <Stack
            component='form'
            onSubmit={(e) => handleSecondStep(e)}
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
              Escolha uma senha
            </Typography>
            <Input
              name='senha'
              value={form.senha}
              handleInput={handleInput}
              inputProps={inputProps[2]} />
            <Input
              name='repitaSenha'
              value={form.repitaSenha}
              handleInput={handleInput}
              inputProps={inputProps[3]} />
            <Box width='16rem' height='3.3rem' mt='2rem'>
              <Button
                buttonProps={buttonProps[1]}
              />
            </Box>
            <Typography
              className='nunito fw400 fs18 lh130p'
              mt='1.5rem'
              sx={{ color: '#3F3F55' }}
            >
              {'Já possui uma conta? Faça seu '}
              <Link
                href='/'
                color='#DA0175'
              >
                Login
              </Link>
            </Typography>
          </Stack>
        }
        {step === 2 &&
          <Stack
            width='100%'
            height='100%'
            direction='column'
            justifyContent='center'
            alignItems='center'
            padding='1rem'
            sx={{ backgroundColor: '#FFFFFF' }}
          >
            <Stack
              width='clamp(20rem,94%, 60rem)'
              height='clamp(40rem, 80%, 51.2rem)'
              direction='column'
              justifyContent='center'
              alignItems='center'
              sx={{ backgroundColor: '#F0F0F5', borderRadius: '3rem' }}
            >
              <Box
                component='img'
                src={iconSuccess}
                alt='icone sucesso'
              />
              <Typography
                className='montserrat fw700 fs24 lh130p'
                align='center'
                mt='2.4rem'
                mx='clamp(1rem, 4rem, 8rem)'
                sx={{ color: '#343447' }}
              >
                Cadastro realizado com sucesso!
              </Typography>
            </Stack>
            <Box width='16rem' height='3.3rem' mt='2rem' mb='clamp(7rem, 30%, 15rem)'>
              <Link href='/' underline='none'>
                <Button buttonProps={buttonProps[2]} />
              </Link>
            </Box>
          </Stack>
        }
        <Box
          position='absolute'
          bottom='10%'
        >
          <MiniStepper step={step} />
        </Box>
      </Grid>
    </Grid>
  )
}
