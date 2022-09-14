import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../../Components/DashboardHeader';
import SideMenu from '../../../Components/SideMenu';
import { useDrawerContext } from '../../../contexts/DrawerContext';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import iconClients from '../../../assets/unfocus-clients-icon.png';
import Typography from '@mui/material/Typography';
import Button from '../../../Components/Button';
import ClientDataDisplay from '../../../Components/DataDisplay';
import ClientChargesTable from '../../../Components/ClientChargesTable';
import { handleValueToCPF, handleValueToPhone } from '../../../utils/formatters';
import './styles.css';

const buttonProps = [
    { label: 'Voltar', type: 'button', class: 'button cancelButton' },
    { label: 'Editar Cliente', type: 'button', class: 'button cancelButton' },
    { label: '+ Nova Cobrança', type: 'button', class: 'button' }
]

export default function DashboardClientDetails() {
    const { clientData, setClientData, setShowClientModal, setClientEditMode, setShowChargeModal } = useDrawerContext()
    const navigate = useNavigate();

    function handleBackToDashboardClient() {
        setClientData({});
        return navigate('/clientes');
    }

    function handleShowClientModal() {
        setShowClientModal(true);
        setClientEditMode(true);
    }

    function handleAddChargeClick() {
        setShowChargeModal(true);
        setClientData(clientData);
    }

    useEffect(() => {
        if (!clientData.nome) {
            return navigate('/clientes')
        }
    });

    return (
        <SideMenu>
            <DashboardHeader headerSubtitle={'Clientes  >  Detalhes do Cliente'} />
            <Grid
                container
                className='dashboardClientDetails-container'
                justifyContent='center'
                gap='2.4rem'
            >
                <Grid
                    item
                    width='clamp(20rem, 100%, 180rem)'
                >
                    <Grid
                        container
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        mb='2.4rem'
                    >
                        <Grid
                            item
                            display='flex'
                            alignItems='center'
                            xs={12}
                            sm={8}
                        >
                            <Box
                                component='img'
                                src={iconClients}
                                width='3.2rem'
                                height='3.2rem'
                                mr='1.2rem'
                            />
                            <Typography
                                className='montserrat fw600 fs26 lh130p'
                                sx={{ color: '#3F3F55' }}
                            >
                                {clientData.nome}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            display='flex'
                            justifyContent='end'
                            xs={12}
                            sm={4}
                        >
                            <Box
                                width='8rem'
                            >
                                <Button
                                    buttonProps={buttonProps[0]}
                                    onClick={handleBackToDashboardClient}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        className='dashboardClientDetails__card'
                        direction='column'
                    >
                        <Grid
                            container
                            columns={21}
                            mb='1.8rem'
                        >
                            <Grid
                                item
                                width='100%'
                                xs={21}
                                sm={13}
                                display='flex'
                                alignItems='center'
                            >
                                <Typography
                                    className='montserrat fw700 fs18 lh130p'
                                    sx={{ color: '#3F3F55' }}
                                >
                                    Dados do cliente
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={21}
                                sm={8}
                                display='flex'
                                justifyContent='end'
                                alignItems='end'
                            >
                                <Box
                                    width='clamp(10rem, 100%, 25.1rem)'
                                    height='3.5rem'
                                >
                                    <Button
                                        buttonProps={buttonProps[1]}
                                        onClick={handleShowClientModal}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            columns={21}
                            mb='5.5rem'
                        >
                            <Grid
                                item
                                sm={21}
                                md={5}
                            >
                                <ClientDataDisplay
                                    label='E-mail'
                                    data={clientData.email}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={21}
                                sm={11}
                                md={4}
                            >
                                <ClientDataDisplay
                                    label='Telefone'
                                    data={handleValueToPhone(clientData.telefone)}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={21}
                                sm={10}
                                md={4}
                            >
                                <ClientDataDisplay
                                    label='CPF'
                                    data={handleValueToCPF(clientData.cpf)}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            columns={21}
                        >
                            <Grid
                                item
                                xs={21}
                                md={5}
                            >
                                <ClientDataDisplay
                                    label='Endereço'
                                    data={clientData.endereco}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={21}
                                md={4}
                            >
                                <ClientDataDisplay
                                    label='Bairro'
                                    data={clientData.bairro}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={21}
                                md={4}
                            >
                                <ClientDataDisplay
                                    label='Complemento'
                                    data={clientData.complemento}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={21}
                                md={4}
                            >
                                <ClientDataDisplay
                                    label='CEP'
                                    data={clientData.cep}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={15}
                                md={3}
                            >
                                <ClientDataDisplay
                                    label='Cidade'
                                    data={clientData.cidade}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                md={1}
                            >
                                <ClientDataDisplay
                                    label='UF'
                                    data={clientData.uf}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    className='dashboardClientDetails__card'
                    direction='column'
                    width='clamp(20rem, 100%, 180rem)'
                >
                    <Grid
                        container
                        columns={21}
                        mb='1.8rem'
                    >
                        <Grid
                            item
                            width='100%'
                            xs={21}
                            sm={13}
                            display='flex'
                            alignItems='center'
                        >
                            <Typography
                                className='montserrat fw700 fs18 lh130p'
                                sx={{ color: '#3F3F55' }}
                            >
                                Cobranças do Cliente
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={21}
                            sm={8}
                            display='flex'
                            justifyContent='end'
                            alignItems='end'
                        >
                            <Box
                                width='clamp(10rem, 100%, 25.1rem)'
                                minHeight='3.5rem'
                            >
                                <Button
                                    buttonProps={buttonProps[2]}
                                    onClick={handleAddChargeClick}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        display='flex'
                        flexDirection='column'
                    >
                        <ClientChargesTable />
                    </Grid>
                </Grid>
            </Grid>
        </SideMenu>
    )
}