import UserModalForm from './Form';
import closeIcon from '../../assets/close-icon.png';
import './styles.css';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { Box } from '@mui/material';

export default function UserModal() {
    const { setShowUserModal, setErrorMessageUserModal } = useDrawerContext()

    function handleCloseClick() {
        setShowUserModal(false);
        setErrorMessageUserModal(
            {
                nome: '',
                email: '',
                senha: '',
                repitaSenha: ''
            }
        )
    }
    return (
        <Box className='userModal-container'>
            <Box className='userModal-cardContainer'>
                <img
                    className='userModal__close-icon'
                    src={closeIcon} alt='Fechar'
                    onClick={handleCloseClick}
                />
                <UserModalForm />
            </Box>
        </Box>
    )
}