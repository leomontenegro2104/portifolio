import Logo from '../Components/Logo';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../services/api';

function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    checkPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  function handleChangeInputValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name) {
      return setErrorMessage('O nome é de preenchimento obrigatório');
    }

    if (!form.email) {
      return setErrorMessage('O campo e-mail é de preenchimento obrigatório');
    }

    if (!form.password || form.password.length < 6) {
      return setErrorMessage('A senha deve possuir no mínimo 6 caracteres');
    }

    if (!form.checkPassword || form.password !== form.checkPassword) {
      return setErrorMessage('A confirmação de senha não confere com a senha');
    }

    try {
      await api.post('usuario/', {
        nome: form.name,
        email: form.email,
        senha: form.password
      });

      navigate('/sign-in');
    } catch (error) {
      return setErrorMessage(error.response.data.mensagem);
    }
  }

  return (
    <div className="container-signup font-rubik">
      <Logo />
      <div className='signup__container'>
        <form className='signup-form bg-white' onSubmit={handleSubmit}>
          <h2 className='login_signup-title color-purple margin-bottom8 weight700'>Cadastre-se</h2>
          <div className='form__input-label margin-bottom16'>
            <label
              className='margin-bottom8 login_signup-label color-dark'
              htmlFor='name'
            >
              Nome
            </label>
            <input
              className='margin-bottom8 login-signup-input'
              id='name'
              type='text'
              value={form.name}
              onChange={handleChangeInputValue}
              name='name'
            />
            <label
              className='margin-bottom8 login_signup-label color-dark'
              htmlFor='email'
            >
              E-mail
            </label>
            <input
              className='margin-bottom8 login-signup-input'
              id='email'
              type='email'
              value={form.email}
              onChange={handleChangeInputValue}
              name='email'
            />
            <label
              className='margin-bottom8 login_signup-label color-dark'
              htmlFor='password'
            >
              Senha
            </label>
            <input
              className='margin-bottom8 login-signup-input'
              id='password'
              type='password'
              value={form.password}
              onChange={handleChangeInputValue}
              name='password'
            />
            <label
              className='margin-bottom8 login_signup-label color-dark'
              htmlFor='check-password'
            >
              Confirmação de senha
            </label>
            <input
              className='margin-bottom16 login-signup-input'
              id='check-password'
              type='password'
              value={form.checkPassword}
              onChange={handleChangeInputValue}
              name='checkPassword'
            />
            {errorMessage && <p className='error-message margin-bottom8 font-lato'>{errorMessage}</p>}
          </div>
          <button className='signup-btn btn-purple margin-bottom8'>Cadastrar</button>
          <Link
            className='signup-link font-lato color-light-purple weight700'
            to='/sign-in'
          >
            Já tem cadastro? Clique aqui!
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
