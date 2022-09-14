import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Input({
  inputProps,
  name,
  value,
  handleInput,
  height,
  display = 'block',
  boxPb = '2rem',
  readOnly = false,
  multiline = false,
  onKeyUp = () => { },
}) {

  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword(e) {
    setShowPassword(!showPassword);


    // inputProps.type = inputProps.type === 'text' ? 'password' : 'text';
    // return setShowPassword(inputProps.type === 'text' ? true : false);
  }

  return (
    <Box width={'100%'} >
      <Stack pb={'0.6rem'} direction='row'>
        <InputLabel
          className='nunito fw600 fs14 lh20'
          sx={{ color: '#344054' }}
        >
          {inputProps.label}
        </InputLabel>
        {inputProps.link &&
          <Link className='nunito fw600 fs14 lh130p'>{inputProps.link}</Link>}
      </Stack>
      <OutlinedInput
        name={name}
        value={value}
        className='inter fw400 fs16 lh24'
        color='grey'
        error={!!inputProps.error}
        fullWidth={true}
        type={showPassword ? 'text' : inputProps.type}
        placeholder={inputProps.placeholder}
        required={inputProps.required}
        readOnly={readOnly}
        multiline={multiline}
        maxRows={3}
        onChange={(e) => handleInput(e)}
        onKeyUp={(e) => onKeyUp(e)}
        sx={{
          height: `${height}`,
          '&.MuiOutlinedInput-root': {
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0.1rem 0.2rem rgba(16, 24, 40, 0.05)',
            borderRadius: '0.8rem',
          },
        }}
        endAdornment={
          inputProps.adornment &&
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={(e) => handleShowPassword(e)}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      <Box pt={'0.6rem'} pb={boxPb} display={`${display}`}>
        {!!inputProps.error &&
          <Typography
            className='nunito fw600 fs14 lh20'
            sx={{ color: '#E70000' }}
          >{inputProps.error}</Typography>}
      </Box>
    </Box>
  )
}