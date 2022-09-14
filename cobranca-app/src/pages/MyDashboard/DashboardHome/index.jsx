/* eslint-disable react-hooks/exhaustive-deps */
import ColoredCard from '../../../Components/ColoredCard';
import DashboardHeader from '../../../Components/DashboardHeader';
import coloredCardInfo from '../../../utils/coloredCardInfo';
import { chargeCardInfo } from '../../../utils/chargeCardInfo';
import { clientCardInfo } from '../../../utils/clientCardInfo';
import ChargeCard from '../../../Components/ChargeCard';
import ClientCard from '../../../Components/ClientCard';
import './styles.css';
import SideMenu from '../../../Components/SideMenu';
import { Box } from '@mui/material';
import api from '../../../services/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { handleValueToBRL } from '../../../utils/formatters';

export default function DashboardHome() {
    const token = localStorage.getItem('token');
    const [paidCharges, setPaidCharges] = useState([]);
    const [pendingCharges, setPendingCharges] = useState([]);
    const [dueCharges, setDueCharges] = useState([]);

    const [sumPaidCharges, setSumPaidCharges] = useState([]);
    const [sumPendingCharges, setSumPendingCharges] = useState([]);
    const [sumDueCharges, setSumDueCharges] = useState([]);

    const [nonDefaulterClient, setNonDefaulterClient] = useState([]);
    const [defaulterClient, setDefaulterClient] = useState([]);

    async function loadChargesByStatus() {
        try {
            const paidResponse = await api.get('cobrancas/Paga',
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const pendingResponse = await api.get('cobrancas/Pendente',
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const dueResponse = await api.get('cobrancas/Vencida',
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            setPaidCharges(paidResponse.data);
            setPendingCharges(pendingResponse.data);
            setDueCharges(dueResponse.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function loadSumChargesValue() {
        try {
            const paidResponse = await api.get('cobrancas/valor/Paga',
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const pendingResponse = await api.get('cobrancas/valor/Pendente',
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const dueResponse = await api.get('cobrancas/valor/Vencida',
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const paidToNumber = parseInt(paidResponse.data[0].sum);
            const pendingToNumber = parseInt(pendingResponse.data[0].sum);
            const dueToNumber = parseInt(dueResponse.data[0].sum);

            setSumPaidCharges(handleValueToBRL(paidToNumber));
            setSumPendingCharges(handleValueToBRL(pendingToNumber));
            setSumDueCharges(handleValueToBRL(dueToNumber));
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function loadClientsByStatus() {
        try {
            const nonDefaulterResponse = await api.get('status-clientes/Em dia',
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const defaulterResponse = await api.get('status-clientes/Inadimplente',
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            setNonDefaulterClient(nonDefaulterResponse.data);
            setDefaulterClient(defaulterResponse.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        loadChargesByStatus();
        loadClientsByStatus();
        loadSumChargesValue();
    }, [])

    return (
        <SideMenu>
            <DashboardHeader headerTitle={'Resumo das cobranças'} />
            <Box className='dashboardHome-container'>
                <Box className='coloredCard-container'>
                    {
                        coloredCardInfo.map(card => (
                            <ColoredCard
                                key={card.id}
                                cardName={card.cardTitle}
                                cardImg={card.cardIcon}
                                cardValue={
                                    card.id === 1 ?
                                        sumPaidCharges :
                                        card.id === 2 ?
                                            sumDueCharges :
                                            sumPendingCharges
                                }
                                cardColor={card.cardColor}
                            />
                        ))
                    }
                </Box>
                <Box className='chargeCard-container'>
                    {
                        chargeCardInfo.map(card => (
                            <ChargeCard
                                key={card.id}
                                cardColor={card.color}
                                cardQuantity={
                                    card.id === 1 ?
                                        paidCharges.length :
                                        card.id === 2 ?
                                            dueCharges.length :
                                            pendingCharges.length
                                }
                                cardTitle={card.title}
                                rows={
                                    card.id === 1 ?
                                        paidCharges :
                                        card.id === 2 ?
                                            dueCharges :
                                            pendingCharges
                                }
                            />
                        ))
                    }
                </Box>
                <Box className='clientCard-container'>
                    {
                        clientCardInfo.map(card => (
                            <ClientCard
                                key={card.id}
                                cardColor={card.color}
                                cardQuantity={card.id === 1 ? defaulterClient.length : nonDefaulterClient.length}
                                cardTitle={card.title}
                                cardIcon={card.icon}
                                rows={card.id === 1 ? dueCharges : pendingCharges}
                            />
                        ))
                    }
                </Box>
            </Box>
        </SideMenu>
    )
}