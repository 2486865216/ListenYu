import {FC, useEffect, useState} from 'react';
import {getMusic} from "../../service/music";
import ProList from '@ant-design/pro-list';
import Icon, {CaretRightFilled, PauseOutlined} from "@ant-design/icons";
import {dataType, myProps, playMessage} from '../../App';
import {useParams} from "react-router-dom";
import {searchMusic} from "../../service/search";
import {getRecommended} from "../../service/rabbit";


const MusicList: FC<myProps> = (props) => {

    const [musicList, setMusicList] = useState<Array<dataType>>([])
    const [loading, setLoading] = useState(true)
    const [isFirst, setIsFirst] = useState(0)
    const [ifChange, setIfChange] = useState({oldParams: '', newParams: ''})

    const params = useParams()


    const initData = async () => {
        setIfChange({...ifChange, newParams: params.search})
        const res = await searchMusic(params.search)
        setMusicList(res.data)
        if (props.preAudio == null && res.data.length !== 0) {
            const audio = new Audio(res.data[0].url)
            props.initMusicData(res.data, getPlayMessage(audio, audio, {...res.data[0]}))
        }
    }

    const getData = async () => {
        setIfChange({...ifChange, oldParams: params.search, newParams: params.search})
        const res = await getMusic()
        setMusicList(res.data)
        if (props.preAudio == null && res.data.length !== 0) {
            const audio = new Audio(res.data[0].url)
            props.initMusicData(res.data, getPlayMessage(audio, audio, {...res.data[0]}))
        }
    }

    const getRecommendedData = async () => {
        const queueId = params.queueId
        const res = await getRecommended(queueId)
        setIfChange({...ifChange, newParams: params.search})
        if (isFirst == 0 && ifChange.oldParams == ifChange.newParams){
            setMusicList(res.data)
        }
        if (props.preAudio == null && res.data !== 0) {
            const audio = new Audio(res.data[0].url)
            props.initMusicData(res.data, getPlayMessage(audio, audio, {...res.data[0]}))
        }
    }


    useEffect(() => {
        switch (params.search){
            case '1':
                getData().finally(() => {
                    setLoading(false)
                })
                break;
            case 'recommended' :
                getRecommendedData().finally(() => {
                    setLoading(false)
                })
                break;
            default:
                initData().finally(() => {
                    setLoading(false)
                })
        }
    }, [params])

    useEffect(() => {
        changeData(isFirst)
    }, [isFirst])

    const getPlayMessage = (preAudio?: HTMLAudioElement, curAudio?: HTMLAudioElement, curAudioMessage?: dataType): playMessage => {
        return {
            preAudio: preAudio ? preAudio : props.preAudio,
            curAudio: curAudio ? curAudio : props.curAudio,
            curAudioMessage: curAudioMessage ? curAudioMessage : props.curAudioMessage
        }
    }

    const changeData = (id) => {
        if (musicList.length !== 0) {
            const index: number = musicList.findIndex((item) =>
                item.id === id
            )
            const audio = new Audio(musicList[index]?.url)
            props.initMusicData([...musicList], getPlayMessage(audio, audio, {...musicList[index]}))
        }
    }

    const playMusic = (row) => {
        if (ifChange.oldParams !== ifChange.newParams || musicList != props.data) {
            setIsFirst(row.id);
        }
        if (props.curAudioMessage.id === row.id) {
            props.playAndPause(getPlayMessage(null, null, {...row}))
        } else {
            const curAudioMessage = {...row}
            const audio = new Audio(curAudioMessage.url)
            props.changePreAudio(getPlayMessage(props.preAudio, audio, curAudioMessage))
        }
    }

    const play = (row) => {
        if (!props.playing && row.id === props.curAudioMessage.id) {
            return <PauseOutlined/>
        } else {
            return <CaretRightFilled/>
        }
    }
    return (
        <>
            <div style={{
                height: '100px'
            }}/>
            <ProList
                split={true}
                dataSource={musicList}
                showActions={"always"}
                loading={loading}
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

export default MusicList;