import ClientModalForm from './ClientModalForm';
import closeIcon from '../../assets/close-icon.png';
import './styles.css';
import { useDrawerContext } from '../../contexts/DrawerContext';

export default function ClientModal() {
    const { setShowClientModal, setClientEditMode } = useDrawerContext();

    function handleCloseClick() {
        setShowClientModal(false);
        setClientEditMode(false);
    }
    return (
        <div className='clientModal-container'>
            <div className='clientModal-cardContainer'>
                <img
                    className='clientModal__close-icon'
                    src={closeIcon} alt='Fechar'
                    onClick={handleCloseClick}
                />
                <ClientModalForm />
            </div>
        </div>
    )
}