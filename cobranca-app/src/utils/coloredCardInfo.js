import paidChargeIcon from '../assets/paid-charge-icon.png';
import pendingChargeIcon from '../assets/pending-charge-icon.png';
import expiredChargeIcon from '../assets/expired-charge-icon.png';

const coloredCardInfo = [
    {
        id: 1,
        cardIcon: paidChargeIcon,
        cardTitle: 'Cobranças Pagas',
        cardValue: 'R$ 30.000',
        cardColor: 'green'
    },
    {
        id: 2,
        cardIcon: expiredChargeIcon,
        cardTitle: 'Cobranças Vencidas',
        cardValue: 'R$ 7.000',
        cardColor: 'red'
    },
    {
        id: 3,
        cardIcon: pendingChargeIcon,
        cardTitle: 'Cobranças Pendentes',
        cardValue: 'R$ 10.000',
        cardColor: 'yellow'
    },
];

export default coloredCardInfo;