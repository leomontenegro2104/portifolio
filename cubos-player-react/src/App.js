import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Card from './components/Card';
import pauseBtn from './assets/pause.svg'
import playBtn from './assets/play.svg'
import { musics } from './musics.js';
import { useState, useRef } from 'react'

// const song = 'https://storage.googleapis.com/pedagogico/frontend-files/aula-react-referencias-eventos/The%20Von%20Trapp%20Family%20Choir%20-%20Alge.mp3'

function App() {
  let [playing, setPlaying] = useState(false);
  const [playPauseBtn, setPlayPauseBtn] = useState(playBtn);
  const [musicTitle, setMusicTitle] = useState('');
  const [musicArtist, setMusicArtist] = useState('');
  const [song, setSong] = useState('');
  const musicRef = useRef();

  function handleCardClick(obj) {
    setSong(obj.url);
    setMusicTitle(obj.title);
    setMusicArtist(obj.artist);
    setPlayPauseBtn(pauseBtn);
    musicRef.current.play();
    setPlaying(true)
  }

  function handlePlayPause() {
    setPlayPauseBtn(playPauseBtn === pauseBtn ? playBtn : pauseBtn);
    if (playing) {
      musicRef.current.pause();
      setPlaying(false)
    } else {
      musicRef.current.play();
      setPlaying(true)
    }
  }

  function handleStop() {
    musicRef.current.pause();
    musicRef.current.currentTime = 0;
    setPlayPauseBtn(playBtn);
    setPlaying(false)
  }

  function handlePrevious() {
    const songIndex = musics.findIndex(music => music.url === song.toString());
    if (songIndex === 0) {
      setSong(musics[3].url);
      setMusicTitle(musics[3].title);
      setMusicArtist(musics[3].artist);
    } else {
      setSong(musics[songIndex - 1].url);
      setMusicTitle(musics[songIndex - 1].title);
      setMusicArtist(musics[songIndex - 1].artist);
    }
  }

  function handleNext() {
    const songIndex = musics.findIndex(music => music.url === song.toString());
    if (songIndex === musics.length - 1) {
      setSong(musics[0].url);
      setMusicTitle(musics[0].title);
      setMusicArtist(musics[0].artist);
    } else {
      setSong(musics[songIndex + 1].url);
      setMusicTitle(musics[songIndex + 1].title);
      setMusicArtist(musics[songIndex + 1].artist);
    }
  }

  return (
    <div className="container">
      <audio src={song} ref={musicRef} autoPlay />
      <Header />
      <main className='main'>
        <h1 className='main__title'>The best play list</h1>
        <div className='main__cards'>
          {musics.map(music => {
            return (
              <Card
                key={music.id}
                obj={music}
                handle={handleCardClick}
              />
            )
          })}
        </div>
      </main>
      <Footer
        playPauseBtn={playPauseBtn}
        musicTitle={musicTitle}
        musicArtist={musicArtist}
        handlePlayPause={handlePlayPause}
        handleStop={handleStop}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </div>
  );
}

export default App;
