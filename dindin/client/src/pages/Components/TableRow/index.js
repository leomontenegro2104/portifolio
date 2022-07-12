import './styles.css';
import deleteIcon from '../../../assets/delete-icon.png';
import editIcon from '../../../assets/edit-icon.png';
import ConfirmModal from '../ConfirmModal';
import { useState, useEffect } from 'react';


export default function TableRow({ transaction, setShowEditRegister, setTransactionToEdit, loadTransactions }) {
    const transactionDate = new Date(transaction.data);
    const weekdayNumber = transactionDate.getDay();
    const weekdayName = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const [eventId, setEventId] = useState(null);

    function transformDate() {
        const dayNumber = transactionDate.getDate() < 10 ? `0${transactionDate.getDate()}` : transactionDate.getDate();
        const monthNumber = transactionDate.getMonth() < 10 ? `0${transactionDate.getMonth() + 1}` : transactionDate.getMonth() + 1;
        const yearNumber = transactionDate.getFullYear();
        return `${dayNumber}/${monthNumber}/${yearNumber}`
    }

    function handleEditTransaction() {
        setShowEditRegister(true);
        setTransactionToEdit(transaction);
    }

    return (
        <tr className='table__details font-lato'>
            <td className='weight700'>{transformDate()}</td>
            <td>{weekdayName[weekdayNumber]}</td>
            <td>{transaction.descricao}</td>
            <td>{transaction.nome_categoria}</td>
            <td className={`${transaction.tipo === 'Entrada' ? 'color-input' : 'color-output'} weight700`} >{`R$ ${(transaction.valor / 100).toFixed(2)}`}</td>
            <td>
                <img
                    className='icon'
                    src={editIcon}
                    alt='lápis'
                    onClick={handleEditTransaction}
                />
            </td>
            <td className='trash-container'>
                <img
                    className='icon'
                    src={deleteIcon}
                    alt='lixeira'
                    onClick={(e) => setEventId(e.target.id)}
                    id={transaction.id}
                />
                {Number(transaction.id) === Number(eventId) &&
                    <ConfirmModal
                        setEventId={setEventId}
                        transactionId={transaction.id}
                        loadTransactions={loadTransactions}
                    />}
            </td>

        </tr>
    )
}