import './Player.css';
import { useEffect, useState } from "react";
import useSound from "use-sound"; // for handling the sound
import beatOfNature from "../../assets/the-beat-of-nature.mp3"; // importing the music
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
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

  const [time, setTime] = useState({
    min: "",
    sec: ""
  });
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: ""
  });

  const [seconds, setSeconds] = useState();

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain
      });
    }
  }, );

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  return (
    <div className='container'>
      <div className='player'>
        <h2>Playing Now</h2>
        <div className="music-cover"></div>
        <div>
          <h3 className="title">Beat of Nature</h3>
          <p className="subTitle">Qala</p>
        </div>
        <div className='time-bar'>
          <div className="time">
            <span className='time-current'>
              {currTime.min}:{currTime.sec}
            </span>
            <span className='time-end'>
              {time.min}:{time.sec}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={duration / 1000}
            default="0"
            value={seconds}
            className="timeline"
            onChange={(e) => {
              sound.seek([e.target.value]);
            }}
          />
        </div>
        <div className='controllers-container'>
          <div className='controllers'>
            <BiSkipPrevious className='prev-next-button' />
            {isPlaying ? (
                <button>
                  <AiFillPauseCircle className='play-pause-button' onClick={playingButton}/>
                </button>
              ) : (
                <button>
                  <AiFillPlayCircle className='play-pause-button' onClick={playingButton}/>
                </button>
              )}
              <BiSkipNext className='prev-next-button' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player;
