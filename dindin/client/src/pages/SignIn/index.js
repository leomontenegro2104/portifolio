import './styles.css';
import Logo from '../Components/Logo';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { setItem, getItem } from '../../pages/utils/storage'

function SignIn() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const token = getItem('token');

    token && navigate('/dashboard');
  })

  function handleChangeInputValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email) {
      return setErrorMessage('Informe seu e-mail');
    }

    if (!form.password) {
      return setErrorMessage('Informe sua senha');
    }

    try {
      const response = await api.post('login/', {
        email: form.email,
        senha: form.password
      });

      const { token, usuario } = response.data
      setItem('token', token)
      setItem('userId', usuario.id);
      setItem('userName', usuario.nome);

      navigate('/dashboard');
    } catch (error) {
      return setErrorMessage(error.response.data.mensagem);
    }
  }


  const navigate = useNavigate();

  return (
    <div className="container-login font-rubik">
      <Logo />
      <div className='container-login__login-area'>
        <div className='login-area__introduction'>
          <h1 className='introduction__title color-white margin-bottom33 weight700'>Controle suas <strong className='color-purple'>finanças</strong>,
            sem planilha chata.</h1>
          <p className='introduction__description color-white margin-bottom43'>
            Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.
          </p>
          <button
            className='introduction__btn btn-purple'
            onClick={() => { navigate('/sign-up') }}
          >
            Cadastre-se
          </button>
        </div>
        <form className='login-area__login bg-white' onSubmit={handleSubmit}>
          <h2 className='login_signup-title color-purple margin-bottom48'>Login</h2>
          <div className='form__input-label margin-bottom33'>
            <label className='margin-bottom8 login_signup-label color-dark' htmlFor='email'>E-mail</label>
            <input
              className='login-signup-input'
              id='email'
              type='email'
              value={form.email}
              onChange={handleChangeInputValue}
              name='email'
            />
          </div>
          <div className='form__input-label margin-bottom38'>
            <label className='margin-bottom8 login_signup-label color-dark' htmlFor='password'>Password</label>
            <input
              className='margin-bottom8 login-signup-input'
              id='password'
              type='password'
              value={form.password}
              onChange={handleChangeInputValue}
              name='password'
            />
            {errorMessage && <p className='error-message margin-bottom8 font-lato'>{errorMessage}</p>}
          </div>
          <button
            className='login_btn btn-purple'
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
