import defaulterIcon from '../assets/defaulter-icon.png';
import nonDefaulterIcon from '../assets/non-defaulter-icon.png';

const clientCardInfo = [
    {
        id: 1,
        title: 'Clientes Inadiplentes',
        quantity: '',
        color: 'red',
        icon: defaulterIcon
    },
    {
        id: 2,
        title: 'Clientes em dia',
        quantity: '',
        color: 'green',
        icon: nonDefaulterIcon
    }
]

const clientCardTable = [
    {
        id: 1,
        client: 'Cameron Williamson',
        dueDate: '03/02/2021',
        value: 'R$ 500,00'
    },
    {
        id: 2,
        client: 'Savannah Nguyen',
        dueDate: '04/03/2021',
        value: 'R$ 500,00'
    },
    {
        id: 3,
        client: 'Darlene Robertson',
        dueDate: '21/04/2021',
        value: 'R$ 500,00'
    },
    {
        id: 4,
        client: 'Marvin McKinney',
        dueDate: '08/05/2021',
        value: 'R$ 700,00'
    },
];

export {
    clientCardInfo,
    clientCardTable
}