import './Player.css';
import { useEffect, useState } from "react";
import useSound from "use-sound"; // for handling the sound
import beatOfNature from "../../assets/Macy_Gray_Cold_World.mp3"; // importing the music
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
import IconShuffle from "../../images/icon-shuffle.svg"
import IconSound from "../../images/icon-sound.svg"
import IconList from "../../images/icon-list.svg"

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
        <div className='drag-symbol'></div>
        <h2 className='tag'>New Releases</h2>
        <div className="music-cover"></div>
        <div className='music-information'>
          <h3 className="title">Cold World</h3>
          <p className="subtitle">Macy gray</p>
        </div>
        <div className='time-bar'>
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
          <div className="time">
            <span className='time-current'>
              {currTime.min}:{currTime.sec}
            </span>
            <span className='time-end'>
              {time.min}:{time.sec}
            </span>
          </div>
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
        <div className='controllers-small'>
          <img src={IconShuffle} className="controllers-small-item" alt="icon" />
          <img src={IconSound} className="controllers-small-item" alt="icon" />
          <img src={IconList} className="controllers-small-item" alt="icon" />
        </div>
      </div>
    </div>
  )
}

export default Player;
