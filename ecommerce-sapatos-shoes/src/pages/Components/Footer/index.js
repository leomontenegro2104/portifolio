import './style.css';
import logoCubos from '../../../assets/logo.svg';
import logoInsta from '../../../assets/instagram.svg';
import logoFace from '../../../assets/facebook.svg';

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__address'>
                <div className='address__text'>
                    <strong>Endereço:</strong>
                    <span>Rua Cubos, 10</span>
                    <span>Jardim Academy</span>
                    <span>Salvador - Bahia - CEP 41820-021</span>
                </div>
                <div className='address__social-media'>
                    <img className='logo-facebook' src={logoFace} alt='logo facebook' />
                    <img className='logo-instagram' src={logoInsta} alt='logo instagram' />
                </div>
            </div>
            <div className='footer__logo'>
                <img src={logoCubos} alt='logo' />
            </div>
        </footer>
    )
}