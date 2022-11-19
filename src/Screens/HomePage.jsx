import { Box, InputBase, Stack, Typography } from '@mui/material'
import React, { useRef, useEffect } from 'react'
import NavBar from '../Components/NavBar';
import gsap from 'gsap';
import { data } from '../data.jsx';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

    const titleRef = useRef();
    const welcomeRef = useRef();
    const subRef = useRef();
    const fadeInRefs = useRef([]);
    fadeInRefs.current = [];
    const boxRef = useRef();
    const gradientRef = useRef(null);

    const Navigate = useNavigate();

    const addTofadeInRefs = el => {
        if (el && !fadeInRefs.current.includes(el)) {
            fadeInRefs.current.push(el);
        }
    }

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
        gsap.fromTo(titleRef.current, {
            opacity: 0,
            translateY: "100px"
        }, {
            opacity: 1,
            translateY: "0px",
            duration: ".4",
            delay: ".4",
            scrollTrigger: {
                trigger: titleRef.current
            }
        })
        gsap.fromTo(welcomeRef.current, {
            opacity: 0,
            translateY: "100px"
        }, {
            opacity: 1,
            translateY: "0px",
            duration: ".4",
            delay: ".4",
            scrollTrigger: {
                trigger: titleRef.current
            }
        })
        gsap.fromTo(subRef.current, {
            opacity: 0,
            translateY: "100px"
        }, {
            opacity: 1,
            translateY: "0px",
            duration: ".4",
            delay: ".4",
            scrollTrigger: {
                trigger: titleRef.current
            }
        })
        fadeInRefs.current.forEach((el) => {
            gsap.fromTo(el, {
                opacity: 0,
                translateY: "100px"
            }, {
                opacity: 1,
                translateY: "0px",
                duration: ".6",
                delay: ".6",
                scrollTrigger: {
                    trigger: el
                }
            })
        })
        gsap.fromTo(boxRef.current, {
            width: "0%",
            padding: "0%",
            borderRadius: "0px"
        }, {
            width: "56%",
            padding: "0px 2%",
            borderRadius: "10px",
            duration: ".6",
            delay: ".6",
            scrollTrigger: {
                trigger: boxRef.current
            }

        })
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
        <>
            <NavBar />
            <Stack sx={{ width: "100%", height: "89.9vh" }} ref={gradientRef}>
                <Stack sx={{ width: "100%", height: "89.9vh", justifyContent: "center", alignItems: "center", gap: "10px", backgroundColor: "rgb(245,245,242,0.9)" }}>
                    <Typography variant='h2' sx={{ fontSize: "150px", color: "primary.light" }} ref={welcomeRef}>Welcome To</Typography>
                    <Typography variant='h2' sx={{ fontSize: "100px" }} ref={titleRef}>Mero Gana</Typography>
                    <Typography variant='h4' sx={{ fontSize: "20px", letterSpacing: "5px", color: "primary.light" }} ref={subRef}>A place where you can hear your favourite music.</Typography>
                </Stack>
            </Stack>
            <Stack sx={{ width: "100%", height: "100%", padding: "100px 0px", background: "linear-gradient(rgb(245, 81, 209),rgb(81,138,245))", alignItems: "center", justifyContent: "center", gap: "60px" }}>
                <Typography variant='h3' sx={{ color: "white", fontSize: "50px" }} ref={addTofadeInRefs}>Playlist Available</Typography>
                <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", width: "80%", gridColumnGap: "150px", gridRowGap: "20px" }}>
                    {
                        data.map((curr, indx) => (
                            <Stack key={indx} sx={{ justifyContent: "center", alignItems: "center", gap: "10px" }} ref={addTofadeInRefs} onClick={() => {
                                Navigate(`/${indx}`);
                            }}>
                                <img src={curr?.img} style={{ width: "200px" }} />
                                <Typography variant='h3' sx={{ fontSize: "18px", color: "white" }}>{curr?.name}</Typography>
                            </Stack>
                        ))
                    }
                </div>
                {/* <img src={image} style={{ width: "300px" }} /> */}
            </Stack>
        </>
    )
}
