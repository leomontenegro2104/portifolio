import './styles.css';

export default function ClientStatus({ status }) {
    return (
        <div
            className={
                `clientStatus-container 
            ${status === 'Vencida' ? 'defaulter' : status === 'Pendente' ? 'pending' : 'nonDefaulter'}`
            }
        >
            <span className='nunito fw600 fs14 lh19'>
                {status}
            </span>
        </div>
    )
}