import { Stack, Typography, Slider } from '@mui/material';
import React from 'react'
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useState, useRef,useEffect } from 'react';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ReplayIcon from '@mui/icons-material/Replay';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import { data } from '../data.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NearMe } from '@mui/icons-material';


export default function Player({ currentSong, nextSong, setCurrentSong,name }) {

    const size_1320 = useMediaQuery('(min-width:1320px)');
    const size_1300 = useMediaQuery('(min-width:1300px)');
    const size_1000 = useMediaQuery('(min-width:1000px)');

    const [isPlaying, setPlaying] = useState(false);
    const [onFirst,setFirst] = useState(true);
    const [totalTime, setTime] = useState("0:0");
    const [pass, setPass] = useState("0:0");
    const audioRef = useRef();
    const [progressBar, setProgressBar] = useState(0);
    const [volume, setVolume] = useState(localStorage.getItem('volume') === null ? 6 : localStorage.getItem('volume'));

    const handlePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setPlaying(false);
            audioRef.current.volume = volume / 10;

        } else {
            audioRef.current.play();
            setPlaying(true);
            audioRef.current.volume = volume / 10;
        }
    }

    const convertTime = (time) => {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        return `${minutes + ":" + seconds}`;
    }

    const onPlaying = () => {
        setTime(convertTime(audioRef.current?.duration));
        setPass(convertTime(audioRef.current?.currentTime));
        setProgressBar(Number(audioRef.current?.currentTime / audioRef.current?.duration * 50));
        audioRef.current.volume = volume / 10;

    }

    const repeatSong = () => {
        audioRef.current.currentTime = "0";
        audioRef.current.volume = volume / 10;
        audioRef.current.play();
        setPlaying(true);
    }
    useEffect(() => {

        if(currentSong !== 0 || onFirst !== true){
            audioRef.current?.pause();
        setTimeout(function () {
            audioRef.current?.play();
            setPlaying(true);
            audioRef.current.volume = volume / 10;
        }, 500);
        }
        setFirst(false);

    }, [currentSong]);




    const next = () => {
        setCurrentSong(() => {
            let temp = currentSong;
            temp++;
            if (temp > data[name].songs.length - 1) {
                temp = 0;
            }
            return temp;
        });
        audioRef.current?.pause();
        setTimeout(function () {
            audioRef.current.play();
            setPlaying(true);
            audioRef.current.volume = volume / 10;
        }, 500)
    }
    const prev = () => {
        setCurrentSong(() => {
            let temp = currentSong;
            temp--;
            if (temp < 0) {
                temp = data[name].songs.length - 1;
            }
            return temp;
        });
        audioRef.current.currentTime = "0";
        audioRef.current.pause();
        setTimeout(function () {
            audioRef.current.play();
            setPlaying(true);
            audioRef.current.volume = volume / 10;
        }, 500)
    }

    function RightComponent() {
        return (
            <Stack sx={{ position: "fixed", bottom: "0px", width: "94%", height: "20px", padding: "30px 2%", backgroundColor: "rgb(245,245,242,0.5)", flexDirection: "row", alignItems: "center", gap: `${size_1320 === true ? "6px" : '10px'}` }}>
                <Slider
                    size="small"
                    defaultValue={0}
                    aria-label="Small"
                    value={progressBar}
                    max={50}
                    sx={{
                        color: "white", height: "2.5px", width: `${size_1000 === true ? "50%" : "100%"}`, position: "fixed", bottom: "65px", left: `${size_1000 === true ? "50%" : "0%"}`, "& .MuiSlider-thumb": {
                            height: 10,
                            width: "10px",
                            color: "white"
                        },
                        "&	.MuiSlider-track": {
                            color: "blue"
                        }
                    }}
                    onChange={(e) => {
                        audioRef.current.currentTime = Number(e.target.value / 50 * audioRef.current?.duration);
                        audioRef.current.play();
                        setPlaying(true);
                    }}
                />
                <SkipPreviousIcon onClick={() => {
                    prev();
                }} />
                {
                    isPlaying ? <PauseIcon onClick={() => {
                        handlePlay();
                    }} /> : <PlayArrowIcon onClick={() => {
                        handlePlay();
                    }} />
                }
                <SkipNextIcon onClick={() => {
                    next();
                }} />
                <ReplayIcon onClick={() => {
                    repeatSong();
                }} />
                <Typography variant='h3' sx={{ fontSize: "15px", marginLeft: "10px" }}>
                    {size_1300  === true ? data[name].songs[currentSong].name.slice(0, 20) : data[name].songs[currentSong].name.slice(0, 15)}
                </Typography>
                <Typography variant='h3' sx={{ fontSize: "15px", marginLeft: "20px" }}>
                    {pass} / {totalTime === null ? "0:0" : totalTime}
                </Typography>
                {
                    volume === 0 ? <VolumeOffIcon /> : <>{
                        volume > 5 ? <VolumeUpIcon /> : <VolumeDownIcon />
                    }  </>
                }
                <Slider
                    size="small"
                    defaultValue={volume}
                    aria-label="Small"
                    value={volume}
                    max={10}
                    sx={{
                        color: "white", height: "2.5px", width: "10%", "& .MuiSlider-thumb": {
                            height: 10,
                            width: "10px",
                            color: "white"
                        },
                        "&	.MuiSlider-track": {
                            color: "primary.main"
                        }
                    }}
                    onChange={(e) => {
                        setVolume(e.target.value);
                        localStorage.setItem("volume", e.target.value);
                    }}
                />
                <Typography variant='h3' sx={{ fontSize: "15px",display:{lg:"block",md:"none"}}}>{volume}</Typography>
            </Stack>
        )
    }

    return (
        <>
            <RightComponent />
            <audio src={data[name].songs[currentSong].url} ref={audioRef} onTimeUpdate={onPlaying} onEnded={() => {
                next();
            }} />
        </>
    )
}
