import './styles.css';
import closeIcon from '../../../assets/close-icon.png';
import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { getItem, setItem } from '../../utils/storage'

export default function EditUserModal
    (
        {
            showModal,
            setShowModal,
            modalTitle,
        }
    ) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
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
                name: response.data.nome,
                email: response.data.email
            })
        } catch (error) {
            setErrorMessage(error.response.data);
        }
    }

    useEffect(() => {
        loadUser();
    }, [])

    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.name) {
            return setErrorMessage('O nome é de preenchimento obrigatório');
        }

        if (!form.email) {
            return setErrorMessage('O e-mail é de preenchimento obrigatório');
        }

        if (!form.password || form.password.length < 6) {
            return setErrorMessage('A senha deve possuir no mínimo 6 caracteres');
        }

        if (form.password !== form.confirmPassword) {
            return setErrorMessage('A confirmação de senha não confere com a senha');
        }

        const dataSent = {
            nome: form.name,
            email: form.email,
            senha: form.password
        }
        const headerSent = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }

        try {

            await api.put('usuario/', dataSent, headerSent)
            setShowModal(false);
            setErrorMessage(null);
            setItem('userName', form.name);
        } catch (error) {
            setErrorMessage(error.response.data);
        }


    }

    return (
        <div className={!showModal ? 'hide-modal' : 'container-modal'}>
            <div className='modal__form font-rubik'>
                <div className='form__header'>
                    <h1
                        className='header__title'
                    >
                        {modalTitle}
                    </h1>
                    <img
                        className='close-modal'
                        src={closeIcon}
                        alt='fechar'
                        onClick={() => setShowModal(false)}
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form__input'>
                        <label
                            className='margin-bottom8 register-label color-dark'
                            htmlFor='name'
                        >
                            Nome
                        </label>
                        <input
                            className='margin-bottom16 register-input'
                            id='name'
                            type='text'
                            value={form.name}
                            onChange={handleChangeInputValue}
                            name='name'
                        />
                        <label
                            className='margin-bottom8 register-label color-dark'
                            htmlFor='email'
                        >
                            E-mail
                        </label>
                        <input
                            className='margin-bottom16 register-input'
                            id='email'
                            type='email'
                            value={form.email}
                            onChange={handleChangeInputValue}
                            name='email'
                        />
                        <label
                            className='margin-bottom8 register-label color-dark'
                            htmlFor='password'
                        >
                            Senha
                        </label>
                        <input
                            className='margin-bottom16 register-input'
                            id='password'
                            type='password'
                            value={form.password}
                            onChange={handleChangeInputValue}
                            name='password'
                        />
                        <label
                            className='margin-bottom8 register-label color-dark'
                            htmlFor='confirmPassword'
                        >
                            Confirmação da Senha
                        </label>
                        <input
                            className='margin-bottom16 register-input'
                            id='confirmPassword'
                            type='password'
                            value={form.confirmPassword}
                            onChange={handleChangeInputValue}
                            name='confirmPassword'
                        />
                        {errorMessage && <p className='error-message margin-bottom8 font-lato'>{errorMessage}</p>}
                    </div>
                    <div className='container-btn'>
                        <button className='confirm-btn margin-bottom8'>Confirmar</button>
                    </div>
                </form>
            </div>
        </div >
    )
}