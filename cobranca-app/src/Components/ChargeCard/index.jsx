/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useDrawerContext } from '../../contexts/DrawerContext';
import ChargeCardTable from './ChargeCardTable';
import './styles.css';

export default function ChargeCard({ cardTitle, cardQuantity, cardColor, rows }) {
    const navigate = useNavigate();
    const { setChargeRows, setFilteredCharges } = useDrawerContext();

    function handleClick() {
        setChargeRows(rows);
        setFilteredCharges(true);
        navigate('/cobrancas');
    }

    return (
        <div className='chargeCard'>
            <header className='chargeCard__header montserrat'>
                <h3 className='fw600 fs18 lh24'>
                    {cardTitle}
                </h3>
                <span className={`${cardColor} header__span fw700 fs16 lh20`}>
                    {String(cardQuantity).length === 1 ? `0${cardQuantity}` : cardQuantity}
                </span>
            </header>
            <ChargeCardTable rows={rows} />
            <footer className='chargeCard__footer'>
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