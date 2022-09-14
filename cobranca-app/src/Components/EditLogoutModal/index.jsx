import './styles.css';
import logoutIcon from '../../assets/logout-icon.png';
import editIcon from '../../assets/edit-icon.png';
import arrowIcon from '../../assets/arrow-icon.png';
import { useNavigate } from 'react-router-dom';
import { clearAll } from '../../utils/storage';
import { useDrawerContext } from '../../contexts/DrawerContext';

export default function EditLogoutModal({ setShowEditLogoutModal }) {
    const { setShowUserModal } = useDrawerContext()
    const navigate = useNavigate();

    function handleEditClick() {
        setShowUserModal(true);
        setShowEditLogoutModal(false);
    }

    function handleLogoutClick() {
        clearAll();
        setShowEditLogoutModal(false);
        navigate('/signin');
    }

    return (
        <div className="editLogoutModal">
            <img className='arrow' src={arrowIcon} alt='Seta pra cima' />
            <div className='editLogoutModal-container'>
                <button className='edit-container' onClick={handleEditClick}>
                    <img className='editIcon' src={editIcon} alt='Lápis' />
                    <span className='fw600 fs8 lh11 nunito'>Editar</span>
                </button>
                <button className='logout-container' onClick={handleLogoutClick} >
                    <img className='logoutIcon' src={logoutIcon} alt='Saída' />
                    <span className='fw600 fs8 lh11 nunito'>Sair</span>
                </button>
            </div>
        </div>
    )
}