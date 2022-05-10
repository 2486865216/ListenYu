import {FC, useState} from 'react';
import {Button, Progress, message, Modal, Upload} from 'antd';
import {uploadMusic} from "../../service/music";
import {InboxOutlined} from "@ant-design/icons";

type progressType = {
    status: "success" | "normal" | "exception" | "active",
    percent: number,
}

const UploadMusicFile: FC = () => {
    const {Dragger} = Upload

    const [progress, setProgress] = useState<progressType>({
        status: "normal",
        percent: 0,
    })

    const beforeUpload = (file) => {
        let size = file.size / 1024 / 1024
        const isMusic = (file.type === 'audio/mpeg');
        const maxSize = 15
        const isSize = (size <= maxSize);
        if (!isMusic) {
            message.warn("上传类型必须为MP3类型");
        }
        if (!isSize) {
            message.warn("上传文件的大小不能超过" + maxSize + "M");
        }
        return isMusic && isSize;
    }
    const customRequest = async (info) => {
        const {file} = info;
        setProgress({...progress, status: "normal", percent: 50})
        const res = await uploadMusic(file)
        if (res.data.code === 200){
            setProgress({...progress, status: "success", percent: 100})
        }else{
            setProgress({...progress, status: "exception", percent: 100})
        }
        message.info("上传成功!");
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div>
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Dragger
                    beforeUpload={beforeUpload}
                    customRequest={customRequest}
                    showUploadList={false}
                    multiple={true}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">选择或托拽文件到此区域上传</p>
                    <p className="ant-upload-hint">
                        支持单文件/多文件上传
                    </p>
                    <Progress
                        showInfo={false}
                        status={progress.status}
                        percent={progress.percent}
                    />
                </Dragger>
            </Modal>
            <Button onClick={showModal} type={"primary"}>上传文件</Button>
        </div>
    )
}

export default UploadMusicFile;