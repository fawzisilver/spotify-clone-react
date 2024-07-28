import { createContext, useState, useEffect } from "react";
import { useRef } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
	const audioRef = useRef();
	const seekBg = useRef();
	const seekBar = useRef();


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


	const playWithId = async (id) => {
		await setTrack(songsData[id]);
		await audioRef.current.play();
		setPlayStatus(true);
	}

	const previous = async () => {
		if (track.id>0) {
			await setTrack(songsData[track.id-1]);
			await audioRef.current.play();
			setPlayStatus(true);
		}
	}

	const next = async () => {
		if (track.id< songsData.length-1) {
			await setTrack(songsData[track.id+1]);
			await audioRef.current.play();
			setPlayStatus(true);
		}
	}

	useEffect(()=>{
		setTimeout(()=>{
			audioRef.current.ontimeupdate = () => {
				seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%"
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
		seekBg, seekBar,
		track, setTrack,
		playStatus, setPlayStatus,
		play,
		pause,
		time, setTime,
		playWithId,
		previous, next
	};



	return (
		<PlayerContext.Provider value={contextValue}>
			{props.children}
		</PlayerContext.Provider>
	);
};

export default PlayerContextProvider;
