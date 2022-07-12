import './styles.css';
import arrowBaloon from '../../../assets/polygon-baloon.png'
import api from '../../../services/api';
import { getItem } from '../../utils/storage'
import { useEffect } from 'react';

export default function ConfirmModal({ setEventId, transactionId, loadTransactions }) {
    const token = getItem('token');

    async function confirmDeleteTransaction() {
        try {
            await api.delete(`transacao/${transactionId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setEventId(null);
            loadTransactions();
        } catch (error) {

        }
    }



    return (
        <div
            className='container__confirm-modal'
        >
            <div className='container__modal font-rubik'>
                <div className='modal__img-container'>
                    <img src={arrowBaloon} alt='seta balão' />
                </div>
                <div className='modal__itens'>
                    <span className='modal__tile'>Apagar item?</span>
                    <div className='modal__btns-container'>
                        <button
                            className='modal-btn bg-blue'
                            onClick={() => confirmDeleteTransaction()}
                        >
                            Sim
                        </button>
                        <button
                            className='modal-btn bg-red'
                            onClick={() => setEventId(null)}
                        >
                            Não
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}