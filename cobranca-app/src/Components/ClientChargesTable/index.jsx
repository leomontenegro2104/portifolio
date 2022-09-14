/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { DataGrid } from '@mui/x-data-grid';
import api from '../../services/api';
import EditCharge from '../EditCharge';
import DeleteCharge from '../DeleteCharge';
import ChargeStatus from '../ChargeStatus';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { handleValueToBRL } from '../../utils/formatters';
import { format } from 'date-fns';

export default function ClientChargesTable() {
    const token = localStorage.getItem('token');
    const [rows, setRows] = useState([]);
    const { clientData, handleEditCharge, handleDeleteCharge, handleChargeDetails, showChargeModal } = useDrawerContext();

    const columns = [
        {
            field: 'id',
            headerName: 'ID Cob.',
            minWidth: 80,
            flex: 0.5,
            editable: false,
        },
        {
            field: 'vencimento',
            headerName: 'Data de venc.',
            minWidth: 160,
            flex: 1,
            editable: false,
            renderCell: (params) => format(new Date(params.row.vencimento), 'dd/MM/yyyy')
        },
        {
            field: 'valor',
            headerName: 'Valor',
            minWidth: 100,
            flex: 1,
            editable: false,
            renderCell: (params) => handleValueToBRL(params.row.valor)
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 100,
            flex: 1,
            renderCell: (params) => (
                <ChargeStatus status={`${params.row.status}`} due={`${params.row.vencimento}`} />
            )
        },
        {
            field: 'descricao',
            headerName: 'Descrição',
            minWidth: 300,
            flex: 3,
            editable: false,
        },
        {
            field: 'editCharge',
            headerName: '',
            minWidth: 50,
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
            minWidth: 50,
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
        if (!clientData.id) {
            return;
        }
        try {
            const response = await api.get(`cobranca/cliente/${clientData.id}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            setRows(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        if (!showChargeModal) {
            loadCharges();
        }
    }, [clientData, showChargeModal]);

    return (
        <Box
            width='100%'
        >
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                pageSize={3}
                rowsPerPageOptions={[3]}
                experimentalFeatures={{ newEditingApi: true }}
                hideFooter={false}
                hideFooterSelectedRowCount={true}
                sx={{
                    padding: '0.85rem 1rem 0.85rem 1rem',
                    border: 'none',
                    zIndex: 0,
                }}
                className='nunito fs14 lh40'
                onRowClick={(params, event) => handleChargeDetails(params, event)}
            />
        </Box>
    );
}