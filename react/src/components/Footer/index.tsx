import {FC, useEffect} from "react";
import {Row, Col, Button} from "antd";
import "./index.less";
import {useState} from "react";
import Icon, {
    CaretRightFilled,
    FastBackwardFilled,
    FastForwardFilled,
    PauseOutlined,
} from "@ant-design/icons";
import {dataType, myProps, playMessage} from '../../App';
import {VolumeIcon} from "../Icon/MyIcon";
import {node} from "prop-types";

const IsPlay = (props) => {
    const {isPlay, play} = props;
    return isPlay !== true ? (
        <Button onClick={play} size="large" shape="circle" type="primary" icon={<PauseOutlined/>}/>
    ) : (
        <Button onClick={play} size="large" shape="circle" type="primary" icon={<CaretRightFilled/>}/>
    );
};

const Footer: FC<myProps> = (props) => {

    const [styleProgress, setStyleProgress] = useState({width: 0});

    const [progressWidth, setProgressWidth] = useState(0)

    const [styleVolume, setStyleVolume] = useState({height: 90})

    const [volumeHeight, setVolumeHeight] = useState(0)

    const [volumeProgress, setVolumeProgress] = useState({display: 'none'})

    useEffect(() => {
        setProgressWidth(document.getElementById('progress').offsetWidth)
        setVolumeHeight(180)
    }, [0])

    //进度条
    const setProgressStyleWidth = (e) => {
        const progress = document.getElementById('progress');
        let x = e.pageX - progress.getBoundingClientRect().left;
        if (x < 0) x = 0;
        if (x > progress.getBoundingClientRect().width) x = progress.getBoundingClientRect().width;
        setStyleProgress({width: x});
        setCurrentTime(x);
    }

    function change(e) {
        setProgressStyleWidth(e)
    }

    const mouseDown = () => {
        document.onmousemove = mouseMove;
        document.onmouseup = mouseUp;
    }
    const mouseMove = (e) => {
        setProgressStyleWidth(e)
    }
    const mouseUp = () => {
        document.onmousemove = null;
        document.getElementById('progress').onmousemove = null;
    }
    const setCurrentTime = (x) => {
        props.setCurrentTime(x / progressWidth)
    }

    //控制播放
    const getPlayMessage = (preAudio?: HTMLAudioElement, curAudio?: HTMLAudioElement, curAudioMessage?: dataType): playMessage => {
        return {
            preAudio: preAudio ? preAudio : props.preAudio,
            curAudio: curAudio ? curAudio : props.curAudio,
            curAudioMessage: curAudioMessage ? curAudioMessage : props.curAudioMessage
        }
    }

    const PlayTheMusic = () => {
        props.playAndPause(getPlayMessage())
    }
    const changePreAudio = () => {
        const index = props.data.findIndex((item) =>
            item.id === props.curAudioMessage.id
        )
        let curAudioMessage: dataType;
        if (index == 0) {
            curAudioMessage = props.data[props.data.length - 1]
        } else {
            curAudioMessage = props.data[index - 1]
        }
        const audio = new Audio(curAudioMessage.url)
        props.changePreAudio(getPlayMessage(props.preAudio, audio, curAudioMessage))
    }
    const changeNextAudio = () => {
        const index = props.data.findIndex((item) =>
            item.id === props.curAudioMessage.id
        )
        let curAudioMessage: dataType;
        if (index == props.data.length - 1) {
            curAudioMessage = props.data[0]
        } else {
            curAudioMessage = props.data[index + 1]
        }
        const audio = new Audio(curAudioMessage.url)
        props.changePreAudio(getPlayMessage(props.preAudio, audio, curAudioMessage))
    }
    const currentTime = () => {
        if (props.curAudio) {
            let x: number | string = parseInt((props.curAudio.currentTime / 60).toString())

            x = x < 10 ? "0" + x : x + "";

            let y: number | string = parseInt((props.curAudio.currentTime % 60).toString())

            y = y < 10 ? "0" + y : y + ""

            return x + ":" + y + " / " + props.curAudioMessage.time
        } else {
            return "00:00/00:00"
        }
    }

    //音量
    const setVolumeStyleHeight = (e) => {
        const volume = document.getElementById('in');
        let x = volume.getBoundingClientRect().bottom - e.pageY;
        if (x < 0) x = 0;
        if (x > volume.getBoundingClientRect().height) x = volume.getBoundingClientRect().height;
        setStyleVolume({height: x})
        currentVolume(x)
    }
    const volumeChange = (e) => {
        setVolumeStyleHeight(e)
    }
    const volumeMouseDown = () => {
        document.onmousemove = volumeMouseMove;
        document.onmouseup = volumeMouseUp;
    }
    const volumeMouseMove = (e) => {
        setVolumeStyleHeight(e)
    }
    const volumeMouseUp = () => {
        document.onmousemove = null;
        const x = document.getElementById('in')
        if (x) x.onmousemove = null;
    }

    const currentVolume = (x) => {
        props.setVolume(x / volumeHeight)
    }

    //监听歌曲播放和下一首
    if (props.curAudio) {
        props.curAudio.onended = (() => {
            changeNextAudio()
        })
        props.curAudio.ontimeupdate = (() => {
            setStyleProgress({
                ...styleProgress,
                width: props.curAudio.currentTime / props.curAudio.duration * progressWidth
            })
        })
    }

    return (
        <div id="footer">
            <Row justify="center">
                <Col span={22}>
                    <div id="progressdiv">
                        <div onClick={change} onMouseDown={mouseDown} onMouseUp={mouseUp} id="progress">
                            <div style={{...styleProgress}} id="progress1"/>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row justify="center">
                <Col style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} span={8}>
                    <span style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        width: '80%',
                        textAlign: 'center'
                    }}>
                        <b>
                            {props.curAudioMessage.name}
                        </b>
                    </span>
                </Col>
                <Col span={8}>
                    <div
                        id="play"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                        }}
                    >
                        <Button onClick={changePreAudio} type="primary" size="large" shape="circle"
                                icon={<FastBackwardFilled/>}/>
                        <IsPlay isPlay={props.playing} play={PlayTheMusic}/>
                        <Button onClick={changeNextAudio} type="primary" size="large" shape="circle"
                                icon={<FastForwardFilled/>}/>
                    </div>
                </Col>
                <Col span={8}>
                    <div id="volume">
                        <span>
                            <b>
                                {currentTime()}
                            </b>
                        </span>
                        <div id="volumeSon">
                            <Icon
                                onClick={() => {
                                    setVolumeProgress({display: 'flex'})
                                }}
                                component={VolumeIcon}/>
                            <div id="volumeSonDiv"
                                 style={{...volumeProgress}}
                                 onMouseLeave={() => {
                                     setVolumeProgress({display: 'none'})
                                 }}
                            >
                                <div onClick={volumeChange} onMouseDown={volumeMouseDown} onMouseUp={volumeMouseUp}
                                     id="in">
                                    <div style={{...styleVolume}} id="out"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default Footer;
