import {FC, useEffect, useState} from 'react';
import axios from 'axios';

const MusicList: FC = () => {

    const base_url = 'http://localhost:8080/api'
    const [data, setData] = useState([])
    useEffect(() => {
        const response = axios.post(`${base_url}/info/music`);
        response.then((data) => {
            setData([...data.data])
        })
    }, [])
    const test = (id) => {
        document.getElementById(id).style.display = 'block';
    }
    const test1 = (id) => {
        document.getElementById(id).style.display = 'none';
    }

    return (
        <div></div>
    )
}
export default MusicList;