import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import './styles.css';

export default function MiniStepper({step}) {
  return (
    <Stack
      direction='row'
      gap='2rem'
    >
      <Box
        className={`ministepper ${ step===0 ? 'ministepper-active' : ''}`}
      />
      <Box 
        className={`ministepper ${ step===1 ? 'ministepper-active' : ''}`}
      />
      <Box 
        className={`ministepper ${ step===2 ? 'ministepper-active' : ''}`}
      />
    </Stack>
  )
}