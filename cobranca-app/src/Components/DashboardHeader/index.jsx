import profileIcon from '../../assets/profile-icon.png';
import EditLogoutModal from '../EditLogoutModal';
import './styles.css';
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/storage';
import { Typography, Box } from '@mui/material';
import { useDrawerContext } from '../../contexts/DrawerContext';

export default function DashboardHeader({ headerTitle, headerSubtitle }) {
    const [showEditLogoutModal, setShowEditLogoutModal] = useState(false);
    const [initialLetters, setInitialLetter] = useState('');
    const [userName, setUserName] = useState('');
    const { showUserModal } = useDrawerContext();

    function getUserName() {
        setUserName(getItem('userName'));
    }

    function getInitialLetter() {
        const userNameArr = getItem('userName').split(' ');
        const firstLetterFirstName = userNameArr[0][0].toUpperCase();
        const firstLetterSecondName = userNameArr.length === 1 ? '' : userNameArr[1][0].toUpperCase();
        setInitialLetter(firstLetterFirstName + firstLetterSecondName);
    }

    useEffect(() => {
        getUserName();
        getInitialLetter();
    }, [showUserModal])

    return (
        <Box
            className='dashboardHeader'
            width='100%'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
        >
            {
                headerTitle &&
                <Typography
                    className='montserrat fw600 fs26 lh30'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                    overflow='hidden'
                >
                    {headerTitle}
                </Typography>
            }
            {
                headerSubtitle &&
                <Box className='headerSubtitle-container'>
                    <Typography className='inter fs16 lh24 headerSubtitle' >
                        {headerSubtitle}
                    </Typography>
                </Box>
            }
            <Box
                className='header__profile-container'
                onClick={() => setShowEditLogoutModal(!showEditLogoutModal)}
                gap={1}
                sx={{ width: '225px', display: 'flex', justifyContent: 'space-between' }}
            >
                <Box className='profile-avatar'>
                    <Typography className='profile-avatar__letters nunito fw600 fs18 lh30' color='#0E8750'>{initialLetters}</Typography>
                </Box>
                <Typography
                    className='profile-username nunito fw600 fs18 lh25'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                    overflow='hidden'
                >
                    {userName}
                </Typography>
                <img className='profile-arrow' src={profileIcon} alt='seta para baixo' />
                {showEditLogoutModal && <EditLogoutModal setShowEditLogoutModal={setShowEditLogoutModal} />}
            </Box>
        </Box>
    )
}