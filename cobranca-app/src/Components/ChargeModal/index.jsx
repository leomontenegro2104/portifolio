import ChargeForm from './ChargeForm';
import DeleteChargeForm from './DeleteChargeForm';
import closeIcon from '../../assets/close-icon.png';
import { useDrawerContext } from '../../contexts/DrawerContext';
import './styles.css';

export default function ChargeModal() {
    const { chargeDeleteMode, handleCloseChargeModal } = useDrawerContext();

    return (
        <div className='chargeModal-container'>
            <div className='chargeModal-cardContainer'>
                <img
                    className='chargeModal__close-icon'
                    src={closeIcon} alt='Fechar'
                    onClick={handleCloseChargeModal}
                />
                {!chargeDeleteMode && <ChargeForm />}
                {chargeDeleteMode && <DeleteChargeForm />}
            </div>
        </div>
    )
}