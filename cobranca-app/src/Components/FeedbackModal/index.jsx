import { useEffect } from 'react';
import successIcon from '../../assets/success-feedback-icon.png';
import errorIcon from '../../assets/error-feedback-icon.png';
import ButtonBase from '@mui/material/ButtonBase';
import { useDrawerContext } from '../../contexts/DrawerContext';
import './styles.css';

export default function FeedbackModal() {
    const { feedbackModal, setFeedbackModal } = useDrawerContext();

    useEffect(() => {
        setTimeout(() => {
            setFeedbackModal({ ...feedbackModal, show: false });
        }, 1500);
    })

    return (
        <div className={`feedback-modal ${feedbackModal.success ? '' : 'feedback-modal-error'}`}>
            <img
                src={feedbackModal.success ? successIcon : errorIcon}
                alt='Check'
            />
            <span
                className='nunito fs14 lh19 feedback-modal__text'
            >
                {feedbackModal.message}
            </span>
            <ButtonBase
                className='nunito fw600 fs18 feedback-modal__close-icon'
                component='button'
                onClick={() => setFeedbackModal({ ...feedbackModal, show: false })}
            >
                X
            </ButtonBase>
        </div>
    )
}