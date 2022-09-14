import ButtonBase from '@mui/material/ButtonBase';
import './styles.css';

export default function Button({ buttonProps, onClick = (()=>{})}) {
  return (
    <ButtonBase
      className={`nunito fw400 fs18 lh25 ${buttonProps.class}`}
      type={buttonProps.type}
      onClick={() => onClick()}
    >
      {buttonProps.label}
    </ButtonBase>
  )
}