import './styles.css';
import deleteChargeIcon from '../../assets/delete-charge-icon.svg';

export default function DeleteCharge() {
    return (
        <div className='deleteCharge-container'>
            <img src={deleteChargeIcon} alt='Criar cobrança' />
            <span className='nunito fw600 fs08 lh11'>Cobrança</span>
        </div>
    )
}