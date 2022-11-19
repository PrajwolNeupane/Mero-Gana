import React, { useEffect, useRef } from 'react';
import { Button, Stack, Typography, Slider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import gsap from 'gsap';
import { ScrollTrigger, Linear } from 'gsap/all';
import {data} from '../data.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function LeftPlaylistComponent({name}) {

    const discRef = useRef();

    useEffect(() => {
        // gsap.to(discRef.current, {
        //     //, translateX(-50%)"
        //     keyframes: {
        //         "0%": { rotation:"0" },
        //         "100%": { rotation:"360" },
        //     },
        //     duration: 10,
        //     repeat: -1,
        //     ease:Linear.easeNone
        // })
    }, []);

    return (
        <Stack sx={{ width: "50%", height: "100vh", backgroundColor: "primary.main", flexDirection: "column", justifyContent: "flex-end",gap:"100px" }}>
            <img src={data[name].img} style={{width:"200px",height:"200px",objectFit:"contain",marginLeft:"50%",transform:"translateX(-50%)"}}/>
            <Stack sx={{ width: "92%", height: "47vh", flexDirection: "column", padding: "1.5vh 4%", alignItems: "flex-start", justifyContent: "space-between",backgroundColor: "secondary.light" }}>
                <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <Typography variant='h3' sx={{ fontSize: "60px" }}>{data[name].name}</Typography>
                    <Button sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "150px",
                        height: "45px",
                        backgroundColor: "primary.main",
                        borderRadius: "25px", justifyContent: "space-around"
                    }}>
                        <AddIcon sx={{ color: "white" }} />
                        <Typography variant='h3' sx={{ color: "white", fontSize: "18px" }}>ADD</Typography>
                    </Button>
                    <MoreVertIcon sx={{ color: "primary.main" }} />
                </Stack>
                <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <Typography variant='h5' sx={{ fontSize: "14px" }}>&#169; MERO GANA </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}
