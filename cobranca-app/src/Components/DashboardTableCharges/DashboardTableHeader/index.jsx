import chargeIcon from '../../../assets/unfocus-charges-icon.png';
import filterIcon from '../../../assets/filter-icon.png';
import searchIcon from '../../../assets/search-icon.png';
import Input from '../../Input';
import './styles.css';
import { useDrawerContext } from '../../../contexts/DrawerContext';
import api from '../../../services/api';
import { useState } from 'react';

export default function DashboardTableHeader() {
    const token = localStorage.getItem('token');
    const [search, setSearch] = useState('');
    const inputProps = [{ label: '', type: 'text', placeholder: 'Pesquisa', required: false, error: false }];
    const { setChargeRows, setNotFoundedModal } = useDrawerContext();

    function handleInput(e) {
        setSearch(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setNotFoundedModal(false);
        loadCobrancasFiltered();
    }

    async function loadCobrancasFiltered() {
        try {
            const response = await api.get(`pesquisa-cobrancas?busca=${search}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            setChargeRows(response.data);
        } catch (error) {
            if (error.response.data === 'Cobrança não encontrada') {
                setChargeRows('');
                setNotFoundedModal(true);
            }
        }
    }

    return (
        <header className='tableHeader'>
            <div className='tableHeader__title-container'>
                <img className='title-container__img' src={chargeIcon} alt='Pessoas' />
                <h2 className='montserrat fw600 fs26 lh130p title-container__title'>Cobranças</h2>
            </div>
            <div className='tableHeader__addFilter-container'>
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