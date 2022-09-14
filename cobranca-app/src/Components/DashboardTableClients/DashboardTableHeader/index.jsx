import peopleIcon from '../../../assets/unfocus-clients-icon.png';
import filterIcon from '../../../assets/filter-icon.png';
import searchIcon from '../../../assets/search-icon.png';
import Button from '../../Button';
import Input from '../../Input';
import './styles.css';
import { useDrawerContext } from '../../../contexts/DrawerContext';
import { useState } from 'react';
import api from '../../../services/api';

export default function DashboardTableHeader() {
    const token = localStorage.getItem('token');
    const [search, setSearch] = useState('');
    const buttonProps = [{ label: '+ Adicionar cliente', type: 'button', class: 'button' }];
    const inputProps = [{ label: '', type: 'text', placeholder: 'Pesquisa', required: false, error: false }];
    const { setShowClientModal, setShowClientSuccessMessage, setClientRows, setNotFoundedModal } = useDrawerContext();

    function handleClick() {
        setShowClientModal(true);
        setShowClientSuccessMessage(false);
    }

    function handleInput(e) {
        setSearch(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setNotFoundedModal(false);
        loadClientsFiltered();
    }

    async function loadClientsFiltered() {
        try {
            const response = await api.get(`pesquisa-clientes?busca=${search}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            setClientRows(response.data);
        } catch (error) {
            setClientRows('');
            setNotFoundedModal(true);
        }
    }

    return (
        <header className='tableHeader'>
            <div className='tableHeader__title-container'>
                <img className='title-container__img' src={peopleIcon} alt='Pessoas' />
                <h2 className='montserrat fw600 fs26 lh130p title-container__title'>Clientes</h2>
            </div>
            <div className='tableHeader__addFilter-container'>
                <div className='addFilter-container__btn-container'>
                    <Button buttonProps={buttonProps[0]} onClick={handleClick} />
                </div>
                <div className='addFilter-container__filter-container'>
                    <img src={filterIcon} alt='Filtro' />
                </div>
                <div className='addFilter-container__input-container'>
                    <form onSubmit={handleSubmit}>
                        <Input
                            inputProps={inputProps[0]}
                            value={search}
                            handleInput={handleInput}
                            height='39px'
                            display='none'
                        />
                        <img
                            className='addFilter-container__searchIcon'
                            src={searchIcon}
                            alt='Lupa'
                            onClick={handleSubmit}
                        />
                    </form>
                </div>
            </div>
        </header>
    )
}