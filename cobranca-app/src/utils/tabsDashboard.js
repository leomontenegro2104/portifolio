import focusHomeIcon from '../assets/focus-home-icon.png';
import unfocusHomeIcon from '../assets/unfocus-home-icon.png';
import focusClientsIcon from '../assets/focus-clients-icon.png';
import unfocusclientsIcon from '../assets/unfocus-clients-icon.png';
import focusChargesIcon from '../assets/focus-charges-icon.svg';
import unfocusChargesIcon from '../assets/unfocus-charges-icon.png';

const tabsDashboard = [
    {
        id: '1',
        value: 'Home',
        imgOnFocus: focusHomeIcon,
        imgWithNoFocus: unfocusHomeIcon,
        path: '/home'
    },
    {
        id: '2',
        value: 'Clientes',
        imgOnFocus: focusClientsIcon,
        imgWithNoFocus: unfocusclientsIcon,
        path: '/clientes'
    },
    {
        id: '3',
        value: 'Cobranças',
        imgOnFocus: focusChargesIcon,
        imgWithNoFocus: unfocusChargesIcon,
        path: '/cobrancas'
    },

];

export default tabsDashboard;