/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Drawer, List, ListItemButton, ListItemIcon, Typography, useMediaQuery, useTheme } from "@mui/material";
import MyIcon from "../MyIcon";
import { useDrawerContext } from "../../contexts/DrawerContext";
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import tabsDashboard from "../../utils/tabsDashboard";
import UserModal from "../UserModal";
import FeedbackModal from "../FeedbackModal";
import UserSuccessMessage from "../UserSuccessMessage";
import ClientModal from "../ClientModal";
import { useEffect } from "react";
import ChargeModal from "../ChargeModal";
import ChargeDetailsModal from "../ChargeDetailsModal";

function ListItemLink({ to, label, onFocusIcon, unfocusIcon, onClick, }) {
    const navigate = useNavigate();
    const { setShowUserModal, setShowClientModal } = useDrawerContext()

    const resolvedPath = useResolvedPath(to);
    const matchPath = useMatch({ path: resolvedPath.pathname, end: false });

    function handleClick() {
        navigate(to)
        onClick?.();
        setShowUserModal(false);
        setShowClientModal(false);
    }

    return (
        <ListItemButton
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRight: `${matchPath ? '2px solid #DA0175' : 'none'}`,
                marginBottom: '63px'
            }}
            onClick={handleClick}
        >
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                <MyIcon
                    iconImg={matchPath ? onFocusIcon : unfocusIcon}
                    iconName={label}
                />
            </ListItemIcon>
            <Typography className='nunito fw600 fs16 lh22' sx={{ color: `${matchPath ? '#DA0175' : '#343447'}` }}>
                {label}
            </Typography>
        </ListItemButton>
    )
}

export default function SideMenu({ children }) {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const {
        isDrawerOpen,
        toggleDrawerOpen,
        showUserModal,
        showUserSuccessMessage,
        setShowUserSuccessMessage,
        showClientModal,
        showChargeModal,
        showChargeDetails,
        feedbackModal,
        setFilteredCharges,
        setFilteredClients
    } = useDrawerContext();

    function handleClickMenu() {
        setFilteredCharges(false);
        setFilteredClients(false);
        return smDown ? toggleDrawerOpen : undefined
    }

    useEffect(() => {
        if (showUserSuccessMessage) {
            setTimeout(() => {
                setShowUserSuccessMessage(false);
            }, 2000);
        }
    }, [showUserSuccessMessage]);

    return (
        <>
            <Drawer
                open={isDrawerOpen}
                variant={smDown ? 'temporary' : 'permanent'}
                onClose={toggleDrawerOpen}
                sx={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    zIndex: '999'
                }}
            >
                <Box sx={{ width: '108px', height: '100%', background: '#F0F0F5' }}>
                    <Box flex={1}>
                        <List component='nav'>

                            {tabsDashboard.map(tab => (
                                <ListItemLink
                                    key={tab.id}
                                    onFocusIcon={tab.imgOnFocus}
                                    unfocusIcon={tab.imgWithNoFocus}
                                    label={tab.value}
                                    to={tab.path}
                                    onClick={handleClickMenu}
                                />
                            ))}

                        </List>
                    </Box>
                </Box>
            </Drawer>

            {showUserModal && <UserModal />}
            {showUserSuccessMessage && <UserSuccessMessage />}
            {showClientModal && <ClientModal />}
            {showChargeModal && <ChargeModal />}
            {showChargeDetails && <ChargeDetailsModal />}
            {feedbackModal.show && <FeedbackModal />}

            <Box sx={{
                minHeight: '100vh',
                marginLeft: `${smDown ? 0 : '110px'}`,
                padding: '0 32px',
                background: '#F8F8F9'
            }} >
                {children}
            </Box>
        </>
    )
}