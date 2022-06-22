import './style.css';
import logoCubos from '../../../assets/logo.svg'

export default function Header() {
    return (
        <header className='header'>
            <div className='header__text'>
                <h1>MODA MASCULINA</h1>
                <h2>SAPATOS SOCIAIS - CASUAIS - ESPORTE FINO</h2>
            </div>
            <div className='header__logo'>
                <img src={logoCubos} alt='logo' />
            </div>
        </header>
    )
}