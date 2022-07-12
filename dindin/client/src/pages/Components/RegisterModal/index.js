import './styles.css';
import closeIcon from '../../../assets/close-icon.png';
import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { getItem } from '../../utils/storage'

export default function RegisterModal
    (
        {
            showModal,
            setShowModal,
            modalTitle,
            transactionToEdit
        }
    ) {
    const [form, setForm] = useState({
        value: '',
        category: 1,
        date: '',
        description: ''
    });
    const [input, setInput] = useState(false);
    const [categories, setCategories] = useState([])
    const [select, setSelect] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const token = getItem('token');

    async function loadCategories() {
        try {
            const response = await api.get('categoria/',
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            setCategories(response.data);
        } catch (error) {
            setErrorMessage(error.response.data);
        }
    }

    function loadTransactionToEdit() {
        const transactionDate = transactionToEdit && new Date(transactionToEdit.data);
        const dayNumber = transactionDate.getDate() < 10 ? `0${transactionDate.getDate()}` : transactionDate.getDate();
        const monthNumber = transactionDate.getMonth() < 10 ? `0${transactionDate.getMonth()}` : transactionDate.getMonth();
        const yearNumber = transactionDate.getFullYear();
        const formatedDate = `${yearNumber}-${monthNumber}-${dayNumber}`;

        setForm({
            value: (transactionToEdit.valor / 100).toFixed(2),
            category: transactionToEdit.categoria_id,
            date: formatedDate,
            description: transactionToEdit.descricao
        });
        setInput(transactionToEdit.tipo === 'Entrada');
        setSelect(transactionToEdit.categoria_id);
    }

    useEffect(() => {
        loadCategories();
        transactionToEdit && loadTransactionToEdit();
    }, [])

    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleChangeSelect(e) {
        const localCategories = [...categories];
        const myCategory = localCategories.find(category => category.id === Number(e.target.value));
        setSelect(myCategory.id);
        setForm({ ...form, [e.target.name]: myCategory.id });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.value) {
            return setErrorMessage('O valor é de preenchimento obrigatório');
        }

        if (form.value <= 0) {
            return setErrorMessage('O valor deve ser maior que zero');
        }

        if (form.value >= 10000000) {
            return setErrorMessage('O valor máximo é 10 Milhões');
        }

        if (!form.category) {
            return setErrorMessage('A categoria é de preenchimento obrigatório');
        }

        if (!form.date) {
            return setErrorMessage('A data é de preenchimento obrigatório');
        }

        if (!form.description) {
            return setErrorMessage('A descrição é de preenchimento obrigatório');
        }

        const dataSent = {
            valor: form.value * 100,
            categoria_id: form.category,
            data: form.date,
            descricao: form.description,
            tipo: input ? 'Entrada' : 'Saida'
        }
        const headerSent = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }

        try {
            transactionToEdit ?
                await api.put(`transacao/${transactionToEdit.id}`, dataSent, headerSent) :
                await api.post('transacao/', dataSent, headerSent);
            setShowModal(false)
            setErrorMessage(null);
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
                <div className='form__btns'>
                    <button
                        className={input ? `form__btn btn-input  btn-bg--blue` : `form__btn btn-input  btn-bg--gray`}
                        onClick={() => setInput(true)}
                    >
                        Entrada
                    </button>
                    <button
                        className={input ? `form__btn btn-output btn-bg--gray` : `form__btn btn-output btn-bg--red`}
                        onClick={() => setInput(false)}
                    >
                        Saida
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form__input'>
                        <label
                            className='margin-bottom8 register-label color-dark'
                            htmlFor='value'
                        >
                            Valor
                        </label>
                        <input
                            className='margin-bottom16 register-input'
                            id='value'
                            type='number'
                            value={form.value}
                            onChange={handleChangeInputValue}
                            name='value'
                        />
                        <label
                            className='margin-bottom8 register-label color-dark'
                            htmlFor='category'
                        >
                            Categoria
                        </label>
                        <select
                            className='margin-bottom16 register-input'
                            value={select}
                            onChange={handleChangeSelect}
                            name='category'
                        >
                            {categories.map(categorie => (
                                <option
                                    key={categorie.id}
                                    name='category'
                                    value={categorie.id}
                                >
                                    {categorie.descricao}
                                </option>
                            )
                            )}
                        </select>
                        <label
                            className='margin-bottom8 register-label color-dark'
                            htmlFor='date'
                        >
                            Data
                        </label>
                        <input
                            className='margin-bottom16 register-input'
                            id='date'
                            type='date'
                            value={form.date}
                            onChange={handleChangeInputValue}
                            name='date'
                        />
                        <label
                            className='margin-bottom8 register-label color-dark'
                            htmlFor='description'
                        >
                            Descrição
                        </label>
                        <input
                            className='margin-bottom16 register-input'
                            id='description'
                            type='text'
                            value={form.description}
                            onChange={handleChangeInputValue}
                            name='description'
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