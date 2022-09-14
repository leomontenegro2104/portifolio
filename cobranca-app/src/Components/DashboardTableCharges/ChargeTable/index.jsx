/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import api from '../../../services/api';
import ChargeStatus from './ChargeStatus';
import ButtonBase from '@mui/material/ButtonBase';
import { useDrawerContext } from '../../../contexts/DrawerContext';
import { useNavigate } from 'react-router-dom';
import EditCharge from '../../EditCharge';
import DeleteCharge from '../../DeleteCharge';
import { format } from 'date-fns';
import { handleValueToBRL } from '../../../utils/formatters';
import NotFoundModal from '../../NotFoundModal'


export default function ChargeTable() {
    const token = localStorage.getItem('token');
    const { setClientData, chargeRows, setChargeRows, handleEditCharge, handleDeleteCharge, handleChargeDetails, notFoundedModal, setNotFoundedModal, filteredCharges, showChargeModal, clientData } = useDrawerContext();
    const navigate = useNavigate();
    const columns = [
        {
            field: 'nome',
            headerName: 'Cliente',
            minWidth: 200,
            flex: 1,
            disableClickEventBubbling: true,
            renderCell: (params) => (
                <ButtonBase
                    type='button'
                    onClick={(event) => handleClientDetails(event, params)}
                >
                    {params.row.nome}
                </ButtonBase>
            )
        },
        {
            field: 'id',
            headerName: 'ID Cob.',
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'valor',
            headerName: 'Valor',
            minWidth: 150,
            flex: 1,
            renderCell: (params) => handleValueToBRL(params.row.valor),
        },
        {
            field: 'vencimento',
            headerName: 'Data de Venc.',
            minWidth: 150,
            flex: 1,
            renderCell: (params) => format(new Date(params.row.vencimento), 'dd/MM/yyyy')
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 100,
            flex: 1,
            renderCell: (params) => (
                <ChargeStatus status={`${params.row.status}`} />
            )
        },
        {
            field: 'descricao',
            headerName: 'Descrição',
            minWidth: 650,
            flex: 5,
        },
        {
            field: 'editCharge',
            headerName: '',
            maxWidth: 50,
            flex: 0.5,
            disableClickEventBubbling: true,
            renderCell: (params) => (
                <ButtonBase
                    onClick={(event) => handleEditCharge(event, params)}
                >
                    <EditCharge />
                </ButtonBase>
            )
        },
        {
            field: 'deleteCharge',
            headerName: '',
            maxWidth: 50,
            flex: 0.5,
            disableClickEventBubbling: true,
            renderCell: (params) => (
                <ButtonBase
                    onClick={(event) => handleDeleteCharge(event, params)}
                >
                    <DeleteCharge />
                </ButtonBase>
            )
        }
    ];

    async function loadCharges() {
        try {
            const response = await api.get('cobranca',
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            setChargeRows(response.data);
            setNotFoundedModal(false);
        } catch (error) {
            console.log(error.response);
        }
    }

    async function handleClientDetails(event, params) {
        event.ignore = true;
        try {
            const clientDetails = await api.get(`clientes/${Number(params.row.cliente_id)}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setClientData({ ...clientDetails.data });
            navigate('/clientes/detalhes');
        } catch (error) {
            console.log(error.response);
        }
    }

    React.useEffect(() => {
        if (!filteredCharges || !showChargeModal) {
            loadCharges();
        }

    }, [clientData, showChargeModal]);

    return (
        <Box sx={{ height: 610, width: '100%', background: '#FFF', borderRadius: '30px' }}>
            <DataGrid
                rows={chargeRows}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[9]}
                experimentalFeatures={{ newEditingApi: true }}
                hideFooter={false}
                sx={{
                    padding: '8.5px 10px 8.5px 15px',
                    border: 'none',
                    zIndex: 0
                }}
                className='nunito fs14 lh40'
                onRowClick={(params, event) => handleChargeDetails(params, event)}
            />
            {notFoundedModal && <NotFoundModal />}
        </Box>
    );
}