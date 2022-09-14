import { createTheme } from '@mui/material';
import { green, pink } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: '#DA0175',
            dark: pink[700],
            light: pink[500],
            contrastText: '#FFF'
        },
        secondary: {
            main: '#0E8750',
            dark: green[900],
            light: green[700],
            contrastText: '#FFF'
        },
        background: {
            default: '#F8F8F9',
            paper: '#FFF'
        }
    }
})