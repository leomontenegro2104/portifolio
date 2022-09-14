import './styles.css';
import successIcon from '../../assets/success-icon.png';

export default function UserSuccessMessage() {
    return (
        <div className='userSuccessMessage-container'>
            <div className='userSuccessMessage-cardContainer'>
                <img className='successImg' src={successIcon} alt='Sucesso' />
                <h1 className='montserrat fw700 fs24 lh130p sucessMsg'>Cadastro Alterado com sucesso!</h1>
            </div>
        </div>
    )
}