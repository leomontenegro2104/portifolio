/* eslint-disable jsx-a11y/anchor-is-valid */
import './styles.css'
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useDrawerContext } from '../../contexts/DrawerContext';
import ClientCardTable from "./ClientCardTable";
import api from '../../services/api';

export default function ClientCard({ cardTitle, cardQuantity, cardColor, cardIcon, rows }) {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { setClientRows, setFilteredClients } = useDrawerContext();

    async function loadFilteredClients() {
        const status = cardTitle === 'Clientes em dia' ? 'Em dia' : 'Inadimplente';
        try {
            const response = await api.get(`status-clientes/${status}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            setClientRows(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    function handleClick() {
        loadFilteredClients();
        setFilteredClients(true);
        navigate('/clientes');
    }

    return (
        <div className='clientCard'>
            <header className='clientCard__header montserrat'>
                <div className='title-icon__container'>
                    <img className='header__icon' src={cardIcon} alt={cardTitle} />
                    <h3 className='fw600 fs18 lh24'>
                        {cardTitle}
                    </h3>
                </div>
                <span className={`${cardColor} header__span fw700 fs16 lh20`}>
                    {String(cardQuantity).length === 1 ? `0${cardQuantity}` : cardQuantity}
                </span>
            </header>
            <ClientCardTable rows={rows} />
            <footer className='clientCard__footer'>
                <Link
                    component='button'
                    className='footer__link nunito fs18 lh24'
                    onClick={handleClick}
                >
                    Ver todos
                </Link>
            </footer>
        </div>
    )
}