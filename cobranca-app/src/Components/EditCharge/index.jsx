import './styles.css';
import editChargeIcon from '../../assets/edit-charge-icon.svg';

export default function EditCharge() {
    return (
        <div className='editCharge-container'>
            <img src={editChargeIcon} alt='Editar cobrança' />
            <span className='nunito fw600 fs08 lh11'>Editar</span>
        </div>
    )
}