import './style.css';
import closedEye from '../../../assets/close-eye.svg';
import opnenedEye from '../../../assets/open-eye.svg';
import success from '../../../assets/woman-success.png'
import { useState } from 'react'



export default function Form() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [eye, setEye] = useState(closedEye);
    const [background, setBackground] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e) {
        setError('');
        console.log(form);
        e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            return setError('Preencha todos os campos!')
        } else {
            setBackground(success);
        }
    }

    function handleChangeForm(e) {
        const value = e.target.value;
        setForm({ ...form, [e.target.name]: value });
    }

    function handleClearClick() {
        setForm({
            name: '',
            email: '',
            password: ''
        });
        setError('');
    }

    return (background ?
        (
            <div className='success'>
                <img className='success-img' src={background} />
                <span>Cadastro efetuado com sucesso!</span>
            </div>
        ) :
        (
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='title'>Cadastre-se</h1>
                <div className='input-container'>
                    <input
                        className='input'
                        type='text'
                        placeholder='Nome'
                        name='name'
                        value={form.name}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    <input
                        className='input'
                        type='email'
                        placeholder='E-mail'
                        name='email'
                        value={form.email}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    <div className='password-container'>
                        <input
                            className='input input-password'
                            type={eye === closedEye ? 'password' : 'text'}
                            placeholder='Senha'
                            name='password'
                            value={form.password}
                            onChange={(e) => handleChangeForm(e)}
                        />
                        <img
                            src={eye}
                            onClick={() => setEye(eye === closedEye ? opnenedEye : closedEye)}
                        />
                    </div>
                    {error ? <span className='error'>{error}</span> : ''}
                </div>
                <button
                    className='btn btn-submit'
                    type='submit'
                >
                    Cadastrar
                </button>
                <button
                    className='btn btn-cancel'
                    type='button'
                    onClick={() => handleClearClick()}
                >
                    Cancelar
                </button>

                <a href='#'>Já tem cadastro? Clique aqui!</a>
            </form>
        )
    )
}