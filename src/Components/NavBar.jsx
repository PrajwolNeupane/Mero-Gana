import { duration, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, Linear } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function NavBar({triggerRef}) {

    const titleRef = useRef();

    useEffect(() => {
        gsap.to(titleRef.current, {
            keyframes: {
                "0%": { color: "rgb(245, 81, 209)" },
                "25%": { color: "rgb(81,138,245)" },
                "50%": { color: "rgb(81, 245, 166)" },
                "75%": { color: "rgb(127, 245, 81)" },
                "100%": { color: "rgb(245, 81, 209)" },
            },
            duration: 30,
            repeat: -1,
        });
    }, []);

    return (
        <Stack sx={{ width: "90%", padding: "20px 5%", boxShadow: " rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px", flexDirection: "row", justifyContent: "space-between", alignItems: "center", position: "sticky", top: "0px",backgroundColor:"white",zIndex:"2"}} >
            <Typography variant='h2' sx={{ fontSize: "25px" }} ref={titleRef}>Mero Gana</Typography>
        </Stack >
    )
}
