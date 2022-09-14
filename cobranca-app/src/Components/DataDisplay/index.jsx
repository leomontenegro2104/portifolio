import Typography from '@mui/material/Typography';
import './styles.css';

export default function ClientDataDisplay({ label, data }) {
  return (
    <>
      <Typography
        className='nunito fw700 fs16 lh24'
        width='95%'
        overflow='hidden'
        mb='0.8rem'
        sx={{ color: '#3F3F55' }}
      >
        {label}
      </Typography>
      <Typography
        className='nunito fw400 fs16 lh24'
        width='95%'
        overflow='hidden'
        sx={{ color: '#3F3F55' }}
      >
        {data}
      </Typography>
    </>
  )
}