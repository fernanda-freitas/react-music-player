import './Player.css';
import { useEffect, useState } from "react";
import useSound from "use-sound"; // for handling the sound
import beatOfNature from "../../assets/the-beat-of-nature.mp3"; // importing the music
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
// import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
// import { IconContext } from "react-icons"; // for customazing the icons

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(beatOfNature);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  }

  return (
    <div className='container'>
      <h2>Playing Now</h2>
      <img className="musicCover" src="https://picsum.photos/200/200" alt="cover image"/>
      <div>
        <h3 className="title">Rubaiyyan</h3>
        <p className="subTitle">Qala</p>
      </div>
      {isPlaying ? (
          <button>
            <AiFillPauseCircle className='play-pause-button' onClick={playingButton}/>
          </button>
        ) : (
          <button>
            <AiFillPlayCircle className='play-pause-button' onClick={playingButton}/>
          </button>
        )}
    </div>
  )
}

export default Player;
