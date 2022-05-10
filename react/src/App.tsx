import {FC, useState} from "react";
import "./App.less";
import HeadMain from "./components/Head/HeadMain";
import Login from "./components/Login";
import {Route, Routes} from "react-router-dom";
import MySider from "./components/Sider";
import MusicList from "./components/MusciList";
import MyFooter from "./components/Footer"
import AccountCenter from "./pages/AccountCenter";
import NotFound from './pages/404';
import {Col, Row} from "antd";
import Recommended from "./pages/Recommended";

//歌曲信息
export type dataType = {
    id: number,
    name: string,
    time: string,
    url: string
}

//修改的信息
export interface playMessage {
    preAudio: HTMLAudioElement,
    curAudio: HTMLAudioElement,
    curAudioMessage: dataType,
}

export interface musicDataType {
    data: Array<dataType>,
    curAudioMessage: dataType,
    preAudio: HTMLAudioElement,
    curAudio: HTMLAudioElement,
    playing: boolean,
    currentTime: number,
    volume: number
}

//传入子组件类型
export interface myProps extends musicDataType {
    setCurrentTime: any,
    initMusicData: any,
    playAndPause: any,
    changePreAudio: any,
    changeNextAudio: any,
    setVolume: any
}

const App: FC = () => {
    const [musicData, setMusicData] = useState<musicDataType>({
        data: [],
        curAudioMessage: {id: -1, name: '', time: '', url: ''},
        preAudio: null,
        curAudio: null,
        playing: true,
        currentTime: 0,
        volume: 0.5
    })

    const initMusicData = (data: Array<dataType>, playMessage: playMessage) => {
        setMusicData({
            ...musicData,
            data: data,
            preAudio: musicData.preAudio ? musicData.preAudio : playMessage.preAudio,
            curAudio: musicData.curAudio ? musicData.curAudio : playMessage.curAudio,
            curAudioMessage: playMessage.curAudioMessage,
            playing: musicData.playing
        })
    }
    const playAndPause = (playMessage: playMessage) => {

        if (musicData.playing) {
            playMusic(playMessage)
        } else {
            playMessage.curAudio.pause()
            setMusicData({...musicData, playing: true})
        }
    }

    const playMusic = (playMessage: playMessage) => {
        if (playMessage.preAudio) playMessage.preAudio.pause();
        setMusicData({
            ...musicData,
            preAudio: playMessage.curAudio,
            curAudio: playMessage.curAudio,
            curAudioMessage: playMessage.curAudioMessage,
            playing: false
        })
        playMessage.curAudio.play()
        playMessage.curAudio.volume = musicData.volume
    }

    const changePreAudio = (playMessage: playMessage) => {
        playMusic(playMessage);
    }

    const changeNextAudio = (playMessage: playMessage) => {
        playMusic(playMessage);
    }

    const setCurrentTime = (currentPercent) => {
        if (musicData.curAudio) {
            const duration = musicData.curAudio.duration
            musicData.curAudio.currentTime = duration * currentPercent
        }
    }

    const setVolume = (currentVolume) => {
        if (musicData.curAudio) {
            musicData.curAudio.volume = currentVolume;
            setMusicData({...musicData, volume: currentVolume})
        }
    }

    const myMusicList = () => {
        return (
            <>
                <div className={'musicList'}>
                    <MusicList
                        {...musicData}
                        playAndPause={playAndPause}
                        initMusicData={initMusicData}
                        changeNextAudio={changeNextAudio}
                        changePreAudio={changePreAudio}
                        setCurrentTime={setCurrentTime}
                        setVolume={setVolume}
                    />
                </div>
                <div className={'musicFooter'}>
                    <MyFooter
                        {...musicData}
                        playAndPause={playAndPause}
                        initMusicData={initMusicData}
                        changeNextAudio={changeNextAudio}
                        changePreAudio={changePreAudio}
                        setCurrentTime={setCurrentTime}
                        setVolume={setVolume}
                    />
                </div>
            </>
        )
    }

    const mainBody = () => {
        return (
            <div id="layout">
                <div id="head">
                    <HeadMain/>
                </div>
                <div id="content">
                        <Routes>
                            <Route path="/" element={<Recommended />}/>
                            <Route path="musicList/:search" element={myMusicList()} />
                            <Route path="musicList/:search/:queueId" element={myMusicList()} />
                            <Route path="userInfo" element={<AccountCenter/>} />
                            <Route path="notFount" element={<NotFound/>} />
                        </Routes>
                </div>
            </div>
        )
    }

    const main = () => {
        return (
            <Row>
                <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
                    <div className="sider">
                        <div
                            style={{
                                height: "64px",
                                backgroundColor: "green",
                            }}
                        />
                        <MySider/>
                    </div>
                </Col>
                <Col xs={19} sm={19} md={19} lg={19} xl={19} xxl={19}>
                    {mainBody()}
                </Col>
            </Row>
        )
    };
    return (
        <Routes>
            <Route path="*" element={main()}/>
            <Route path="login" element={<Login/>}/>
        </Routes>
    );
};
export default App;
