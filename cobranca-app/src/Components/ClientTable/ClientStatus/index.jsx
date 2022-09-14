import './styles.css';

export default function ClientStatus({ statusClient }) {
    return (
        <div className={`clientStatus-container ${statusClient === 'Inadimplente' ? 'defaulter' : 'nonDefaulter'}`}>
            <span className='nunito fw600 fs14 lh19'>{statusClient}</span>
        </div>
    )
}