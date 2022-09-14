import { Grid } from '@mui/material';
import DashboardHeader from '../../../Components/DashboardHeader';
import DashboardTableClients from '../../../Components/DashboardTableClients';
import SideMenu from '../../../Components/SideMenu';
import './styles.css';

export default function DashboardClient() {
    return (
        <SideMenu>
            <DashboardHeader headerSubtitle={'Clientes'} />
            <Grid container className='dashboardClient-container'>
                <DashboardTableClients />
            </Grid >
        </SideMenu>
    )
}