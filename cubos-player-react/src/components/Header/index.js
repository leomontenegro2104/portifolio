import './style.css'
import logo from '../../assets/logo.svg'
import avatar from '../../assets/profile-leo.jpeg'

export default function Header() {
    return (
        <header className='header'>
            <div className='header__logo'>
                <img src={logo} alt='logo' />
            </div>
            <div className='header__profile'>
                <div className='profile__image'>
                    <img src={avatar} alt='profile' />
                </div>
                <span className='profile__welcome'>
                    Bem vindo, Leonardo.
                </span>
            </div>
        </header>
    )
}