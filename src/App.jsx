//rfce
import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Player from "./components/Player.jsx";
import Display from "./components/Display.jsx";
import { PlayerContext } from "./context/PlayerContext.jsx";
import { useContext } from "react";

const App = () => {
  const{ audioRef, track } = useContext(PlayerContext)

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      <Player />
      {/* ref={audioRef} is the same as const aud = document.getElementById('my-audio) if audio has id="my-audio'" */}
      {/* aud.play() can interact with events */}

      <audio ref={audioRef} src={track.file}  preload="auto"></audio>
    </div>
  );
};

export default App;
