import DashboardHeader from '../../../Components/DashboardHeader';
import './styles.css';
import SideMenu from '../../../Components/SideMenu';
import { Grid } from '@mui/material';
import DashboardTableCharges from '../../../Components/DashboardTableCharges';

export default function DashboardCharge() {
    return (
        <SideMenu>
            <DashboardHeader headerSubtitle={'Cobranças'} />
            <Grid container className='dashboardClient-container'>
                <DashboardTableCharges />
            </Grid >
        </SideMenu>
    )
}