import './Player.css';
import { useEffect, useState } from "react";
import useSound from "use-sound"; // for handling the sound
import beatOfNature from "../../assets/the-beat-of-nature.mp3"; // importing the music
// import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
// import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
// import { IconContext } from "react-icons"; // for customazing the icons

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(beatOfNature);

  return (
    <button onClick={play}>Boop!</button>
  )
}

export default Player;