import './style.css';
import stopBtn from '../../assets/stop.svg'
import previousBtn from '../../assets/previous.svg'
import nextBtn from '../../assets/next.svg'

// const musica = 'https://storage.googleapis.com/pedagogico/frontend-files/aula-react-referencias-eventos/The%20Von%20Trapp%20Family%20Choir%20-%20Alge.mp3'

export default function Footer({
    playPauseBtn,
    musicTitle,
    musicArtist,
    handlePlayPause,
    handleStop,
    handlePrevious,
    handleNext
}) {
    return (
        <div className='footer'>
            <div className='footer__song-info'>
                <strong className='song-info__song-name'>{musicTitle}</strong>
                <span className='song-info__author-name'>{musicArtist}</span>
            </div>
            <div className='footer__player'>
                <button className='player__btn'>
                    <img
                        src={stopBtn}
                        alt='stop'
                        onClick={() => handleStop()} />
                </button>
                <button className='player__btn'>
                    <img
                        src={previousBtn}
                        alt='previous'
                        onClick={() => handlePrevious()}
                    />
                </button>
                <button className='player__btn'>
                    <img
                        src={playPauseBtn}
                        alt='play/pause'
                        onClick={() => handlePlayPause()} />
                </button>
                <button className='player__btn'>
                    <img
                        src={nextBtn}
                        alt='next'
                        onClick={() => handleNext()} />
                </button>
            </div>
        </div>
    )
}