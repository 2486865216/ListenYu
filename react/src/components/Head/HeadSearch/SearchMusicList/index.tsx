import {FC, useEffect, useState} from 'react';
import {getMusic} from "../../../../service/music";
import ProList from '@ant-design/pro-list';
import Icon,{CaretRightFilled, PauseOutlined} from "@ant-design/icons";
import {dataType, musicDataType, myProps, playMessage} from '../../../../App';
import UploadMusicFile from "../../../uploadMusicFile";
import {useLocation} from "react-router-dom";
import {searchMusic} from "../../../../service/search";


const SearchMusicList: FC<myProps> = (props) => {

    const location = useLocation()
    const {state} = location
    const state1 = state as {value}

    const [searchData, setSearchData] = useState<Array<dataType>>([])
    const [isFirst,setIsFirst] = useState(0)

    const initData = async (show) => {
        if (!show) return;
        const res = await searchMusic(state1.value)
        const data = res.data
        setSearchData(data)
    }

    useEffect(() => {
        initData(true)
    }, [0])

    useEffect(() => {
        if (searchData.length !== 0) {
            const index: number = searchData.findIndex((item) =>
                item.id === isFirst
            )
            const audio = new Audio(searchData[index].url)
            props.initMusicData(searchData, getPlayMessage(audio, audio, {...searchData[index]}))
        }
    },[isFirst])

    const getPlayMessage = (preAudio?: HTMLAudioElement, curAudio?: HTMLAudioElement, curAudioMessage?: dataType): playMessage => {
        return {
            preAudio: preAudio ? preAudio : props.preAudio,
            curAudio: curAudio ? curAudio : props.curAudio,
            curAudioMessage: curAudioMessage ? curAudioMessage : props.curAudioMessage
        }
    }

    const playMusic = (row) => {
        if (isFirst === 0) setIsFirst(row.id)
        if (props.curAudioMessage.id === row.id){
            props.playAndPause(getPlayMessage(null, null, {...row}))
        }else {
            const curAudioMessage = {...row}
            const audio = new Audio(curAudioMessage.url)
            props.changePreAudio(getPlayMessage(props.preAudio, audio, curAudioMessage))
        }
    }

    const play = (row) => {
        if (!props.playing && row.id === props.curAudioMessage.id){
            return <PauseOutlined />
        }else {
            return <CaretRightFilled />
        }
    }
    return (
        <>
            <div style={{
                height: '100px'
            }} >
                <UploadMusicFile />
            </div>
            <ProList
                split={true}
                dataSource={searchData}
                showActions={"always"}
                loading={searchData.length === 0}
                metas={{
                    description: {
                        dataIndex: 'name'
                    },
                    content: {
                        dataIndex: 'time',
                    },
                    actions: {
                        render: (text, row, index, action) =>
                            [
                                <Icon style={{
                                    fontSize: '20px'
                                }} key={row.id} component={() => play(row)} onClick={() => playMusic(row)}/>,
                            ]
                    }
                }}
            />
        </>
    );

}

export default SearchMusicList;