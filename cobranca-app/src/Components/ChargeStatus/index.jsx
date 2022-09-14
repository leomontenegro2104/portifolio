import './styles.css';

export default function ChargeStatus({ status, due }) {

    const today = new Date();
    const dueDate = new Date(due);
    let newStatus = status==='Paga' ? 'Paga' : (today > dueDate ? 'Vencida': 'Pendente')

    

    return (
        <div className={`chargeStatus-container ${newStatus.toLowerCase()}`}>
            <span className='nunito fw600 fs14 lh19'>{newStatus}</span>
        </div>
    )
}