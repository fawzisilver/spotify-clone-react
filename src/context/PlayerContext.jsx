import { createContext, useState, useEffect } from "react";
import { useRef } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
	const audioRef = useRef();
	const seekBg = useRef();
	const seekBar = useRef();
	// const seekBg = useRef();
	// const seekBar = useRef();

	const [track, setTrack] = useState(songsData[0]);
	const [playStatus, setPlayStatus] = useState(false);
	const [time, setTime] = useState({
		currentTime: {      //same as const currentTime = {  }    <-- object
			second: 0,
			minute: 0,
		},
		totalTime: {
			second: 0,
			minute: 0,
		},
	})
	// const [track, setTrack] = useState(songsData[0]);
	// const [playStatus, setPlayStatus] = useState(false);
	// const [time, setTime] = useState({
	// 	currentTime: {
	// 		second: 0,
	// 		minute: 0,
	// 	},
	// 	totalTime: {
	// 		second: 0,
	// 		minute: 0,
	// 	},
	// });

	//play() and pause() are built-in methods for <audio> which we can use to manipulate/interact thru ref
	const play = () => {
		if(audioRef.current) {
			audioRef.current.play();
			setPlayStatus(true);
		}
		
	}

	const pause = () => {
		if(audioRef.current) {
			audioRef.current.pause();
			setPlayStatus(false)
		}
		
	}

	useEffect(()=>{
		setTimeout(()=>{
			audioRef.current.ontimeupdate = () => {
				setTime({
					currentTime: {
						second: Math.floor(audioRef.current.currentTime % 60),
						minute: Math.floor(audioRef.current.currentTime / 60)
					},
					totalTime: {
						second: Math.floor(audioRef.current.duration % 60),
						minute: Math.floor(audioRef.current.duration / 60)
					}
				})
			}
		},1000)
	},[audioRef])

	

	const contextValue = {
		audioRef,    //audioRef: audioRef, (shorthand is w/o ":")
		seekBg,
		seekBar,
		track,
		setTrack,
		playStatus,
		setPlayStatus,
		play,
		pause,
		time,
		setTime 
	};

	return (
		<PlayerContext.Provider value={contextValue}>
			{props.children}
		</PlayerContext.Provider>
	);
};

export default PlayerContextProvider;
