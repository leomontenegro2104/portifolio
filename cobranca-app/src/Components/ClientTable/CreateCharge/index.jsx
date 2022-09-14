import './styles.css';
import createChargeIcon from '../../../assets/create-charge-icon.png';
import { useDrawerContext } from '../../../contexts/DrawerContext';

export default function CreateCharge({ clientData }) {
    const { setShowChargeModal, setClientData } = useDrawerContext();

    function handleCreateChargeClick() {
        setShowChargeModal(true);
        setClientData(clientData);
    }

    return (
        <div
            className='createCharge-container'
            onClick={handleCreateChargeClick}
        >
            <img src={createChargeIcon} alt='Criar cobrança' />
            <span className='nunito fw600 fs08 lh11 createCharge-text'>Cobrança</span>
        </div>
    )
}