/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { handleValueToBRL } from '../../../utils/formatters';

const columns = [
    {
        field: 'client',
        headerName: 'Cliente',
        width: 108,
    },
    {
        field: 'id',
        headerName: 'ID da cob.',
        width: 121,
        align: 'center'
    },
    {
        field: 'value',
        headerName: 'Valor',
        width: 100,
    }
];

export default function ChargeCardTable({ rows }) {
    const [loading, setLoading] = React.useState(true);
    const localRows = rows.map(row => (
        {
            id: row.id,
            client: row.nome,
            value: handleValueToBRL(row.valor)
        }
    ));

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
