import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
import LeftPlaylistComponent from "../Components/LeftPlaylistComponent";
import Player from "../Components/Player";
import RightComponent from "../Components/RightComponent";
import { data } from '../data.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useParams } from 'react-router-dom';

export default function PlayList() {

    const [currentSong, setCurrentSong] = useState(0);
    const [nextSong, setNextSong] = useState(1);
    const size_800 = useMediaQuery('(min-width:800px)');
    const {id} = useParams();

    useEffect(() => {
        setNextSong(() => {
            if (currentSong + 1 > data[0].songs.length - 1) {
                return 0;
            } else {
                return currentSong + 1;
            }
        })
    }, [currentSong]);

    return (
        <Stack sx={{ width: "100%", height: "100vh", flexDirection: "row" }}>
            {
                size_800 === true ? <LeftPlaylistComponent name={id}/> : <></>
            }
            <RightComponent currentSong={currentSong} setCurrentSong={setCurrentSong} nextSong={nextSong} name={id}/>
        </Stack>
    )
}
