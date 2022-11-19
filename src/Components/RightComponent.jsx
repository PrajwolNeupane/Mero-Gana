import React, { useRef, useEffect } from 'react';
import { Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Player from './Player';
import MenuIcon from '@mui/icons-material/Menu';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { data } from '../data.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Scrollbars } from 'react-custom-scrollbars';
import useMediaQuery from '@mui/material/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

export default function RightComponent({ currentSong, setCurrentSong, nextSong ,name}) {
    const gradientRef = useRef(null);
    const size_1000 = useMediaQuery('(min-width:1000px)');

    useEffect(() => {
        gsap.to(gradientRef.current, {

            keyframes: {
                "0%": { background: "linear-gradient(to top right,rgb(245, 81, 209),rgb(81,138,245), rgb(245, 81, 209))" },
                "25%": { background: "linear-gradient(to top right,rgb(86, 81, 245),rgb(81, 245, 166), rgb(86, 81, 245))" },
                "50%": { background: "linear-gradient(to top right,rgb(81, 245, 166),rgb(127, 245, 81), rgb(81, 245, 166))" },
                "75%": { background: "linear-gradient(to top right,rgb(127, 245, 81),rgb(245, 81, 209), rgb(127, 245, 81))" },
                "100%": { background: "linear-gradient(to top right,rgb(245, 81, 209),rgb(81,138,245), rgb(245, 81, 209))" },
            },
            duration: 30,
            repeat: -1,
        })
    }, []);


    return (
        <Stack sx={{ width: `${size_1000 === true ? "50%" :"100%"}`, height: "100vh", lineHeight: "100vh" }} ref={gradientRef}>
            <Stack sx={{ width: "100%", height: "100vh", backgroundColor: "rgb(245,245,242,0.85)" }}>
                <Stack sx={{ flexDirection: "row", margin: "8% 10% 0px 10%", width: "80%" }}>
                    <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
                            <ArrowBackIcon sx={{ color: "primary.light", fontSize: "20px" }} />
                            <Typography sx={{ color: "primary.light", fontSize: "16px" }} variant="h3">Back</Typography>
                        </Stack>
                        <MenuIcon sx={{ color: "primary.light", fontSize: "25px" }} />
                    </Stack>
                </Stack>
                <Stack sx={{ margin: "8% 10% 0px 10%", gap: "20px" }}>
                    <Typography sx={{ color: "primary.light", fontSize: "20px" }} variant="h4">Playlist /  <span style={{ color: "blue" }}>{data[name].name}</span></Typography>
                    <Typography sx={{ color: "primary.light", fontSize: "40px" }} variant="h3">{data[name].songs[currentSong].name.slice(0, 22)}</Typography>
                </Stack>
                <Scrollbars style={{ width: "100%", height: "360px" ,color:"red"}}>
                    <Stack sx={{ gap: "10px",  top: "280px"}}>
                        {
                            data[name].songs.map((curr, index) => (
                                <>
                                    <Stack key={index} sx={{ flexDirection: "row", width: "80%", backgroundColor: `${index === currentSong ? "rgb(245,245,242,0.4)" : "transparent"}`, padding: "20px 10%", alignItems: "center", gap: "20px" }}>
                                        {
                                            index === currentSong ? <PauseIcon sx={{ color: "primary.light" }} /> : <PlayArrowIcon sx={{ color: "primary.light" }} />
                                        }
                                        <Typography variant='h3' sx={{ fontSize: "16px", color: "primary.light",cursor:"pointer" }} onClick={()=>{
                                            setCurrentSong(index);
                                        }}>
                                            {curr.name.slice(0, 50)}
                                        </Typography>
                                    </Stack>
                                </>
                            ))
                        }
                    </Stack>
                </Scrollbars>
                <Player currentSong={currentSong} setCurrentSong={setCurrentSong} nextSong={nextSong} name={name}/>
            </Stack>
        </Stack>
    )
}
