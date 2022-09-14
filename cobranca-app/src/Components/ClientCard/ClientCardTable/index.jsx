import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import './styles.css';
import { handleValueToBRL } from '../../../utils/formatters';
import { format } from 'date-fns';

const columns = [
    {
        field: 'client',
        headerName: 'Clientes',
        width: 180
    },
    {
        field: 'dueDate',
        headerName: 'Data de venc.',
        width: 170,
        align: 'left'
    },
    {
        field: 'value',
        headerName: 'Valor',
        width: 160,
    }
];

export default function ClientCardTable({ rows }) {
    const [loading, setLoading] = React.useState(true);
    const localRows = rows.map(row => (
        {
            id: row.id,
            client: row.nome,
            dueDate: format(new Date(row.vencimento), 'dd/MM/yyyy'),
            value: handleValueToBRL(row.valor)
        }
    ))

    function handleLoadingRows() {
        setTimeout(() => {
            setLoading(false);
        }, 1430)
    }

    React.useEffect(() => {
        handleLoadingRows();
    }, []);

    return (
        <Box sx={{ height: 290, width: '100%' }}>
            <DataGrid
                rows={localRows}
                columns={columns}
                pageSize={4}
                rowsPerPageOptions={[4]}
                experimentalFeatures={{ newEditingApi: true }}
                hideFooter={true}
                loading={loading}
                sx={{
                    padding: '8.5px 10px 8.5px 15px',
                    border: 'none',
                }}
                className='nunito fs14 lh40'
            />
        </Box>
    );
}
