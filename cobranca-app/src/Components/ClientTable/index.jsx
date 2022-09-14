import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import api from '../../services/api';
import CreateCharge from './CreateCharge';
import ClientStatus from './ClientStatus';
import ButtonBase from '@mui/material/ButtonBase';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { useNavigate } from 'react-router-dom';
import NotFoundModal from '../NotFoundModal';
import { handleValueToCPF, handleValueToPhone } from '../../utils/formatters';


export default function ClientTable() {
    const token = localStorage.getItem('token');
    const { setClientData, showClientModal, clientRows, setClientRows, notFoundedModal, setNotFoundedModal, filteredClients } = useDrawerContext();
    const navigate = useNavigate();

    const columns = [
        {
            field: 'nome',
            headerName: 'Cliente',
            minWidth: 190,
            flex: 1,
            renderCell: (params) => (
                <ButtonBase
                    type='button'
                    onClick={() => handleClientDetails(params.row)}
                >
                    {params.row.nome}
                </ButtonBase>
            )
        },
        {
            field: 'cpf',
            headerName: 'CPF',
            minWidth: 190,
            flex: 1,
            renderCell: (params) => (handleValueToCPF(params.row.cpf)),
        },
        {
            field: 'email',
            headerName: 'E-mail',
            minWidth: 190,
            flex: 1,
        },
        {
            field: 'telefone',
            headerName: 'Telefone',
            minWidth: 180,
            flex: 1,
            renderCell: (params) => (handleValueToPhone(params.row.cpf)),
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 180,
            flex: 1,
            renderCell: (params) => (
                <ClientStatus statusClient={params.row.status} />
            )
        },
        {
            field: 'createCharge',
            headerName: 'Criar Cobrança',
            maxWidth: 170,
            flex: 1,
            renderCell: (params) => (
                <CreateCharge clientData={params.row} />
            )
        }
    ];


    async function loadClients() {
        try {
            const response = await api.get('clientes/',
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            setClientRows(response.data);
            setNotFoundedModal(false);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    function handleClientDetails(rowData) {
        setClientData({ ...rowData });
        return navigate('/clientes/detalhes');
    }

    React.useEffect(() => {
        if (!filteredClients) {
            loadClients();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showClientModal]);

    return (
        <Box sx={{ height: 610, width: '100%', background: '#FFF', borderRadius: '30px', }}>
            <DataGrid
                rows={clientRows}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[9]}
                experimentalFeatures={{ newEditingApi: true }}
                hideFooter={false}
                sx={{
                    padding: '8.5px 10px 8.5px 15px',
                    border: 'none',
                    zIndex: 0,
                    position: 'relative',
                    top: '0',
                    width: '100%',
                    height: '100%'
                }}
                className='nunito fs14 lh40'
            />
            {notFoundedModal && <NotFoundModal />}
        </Box>
    );
}