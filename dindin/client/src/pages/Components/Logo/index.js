import logoDinDin from '../../../assets/logo-dindin.png';

export default function Logo() {
    return (
        <div className='container-login__logo'>
            <img
                className='logo__img'
                src={logoDinDin}
                alt='logo' />
        </div>
    )

}
