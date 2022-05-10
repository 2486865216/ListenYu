import {FC, useEffect, useState} from "react";
import {Avatar, Card, Col, Divider, Row} from "antd";
import {getDetailInfo} from "../../service/login";
import {ContactsOutlined, HomeOutlined, MailOutlined, MobileOutlined} from "@ant-design/icons";
import UploadMusicFile from "../../components/uploadMusicFile";

type userDetailInfo = {
    address: string,
    avatar: string,
    email: string,
    gender: number,
    id: number,
    phone: string,
    username: string,
}

const AccountCenter: FC = () => {
    const avatarSize = 100;
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    const [userDetailInfo, setUserDetailInfo] = useState<userDetailInfo>({
        address: null,
        avatar: null,
        email: null,
        gender: -1,
        id: -1,
        phone: null,
        username: null,
    })
    const [tabKey, setTabKey] = useState('mylove');

    const getUserDetailInfo = async () => {
        const data = await getDetailInfo(userInfo.username)
        setUserDetailInfo({...data.data.data})
    }
    useEffect(() => {
        getUserDetailInfo()
    }, [0])

    const operationTabList = [
        {
            key: 'mylove',
            tab: (
                <span>我的收藏 <span style={{fontSize: 14}}></span></span>
            ),
        },
        {
            key: 'applications',
            tab: (
                <span>
        应用 <span style={{fontSize: 14}}></span>
      </span>
            ),
        },
        {
            key: 'projects',
            tab: (
                <span>
        项目 <span style={{fontSize: 14}}></span>
      </span>
            ),
        },
    ];

    const renderChildrenByTabKey = (keyValue: string) => {
        switch (keyValue) {
            case "mylove":
                return <div></div>
        }
    }
    return (
        <div>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={24} lg={7} xl={7}>
                    <Card
                        bordered={true}
                        style={{marginBottom: 24, textAlign: "center"}}
                        loading={false}
                    >
                        <div>
                            <Avatar
                                size={{
                                    xs: avatarSize,
                                    sm: avatarSize,
                                    md: avatarSize,
                                    lg: avatarSize,
                                    xl: avatarSize,
                                    xxl: avatarSize,
                                }}
                                src={userDetailInfo.avatar}
                            />
                            <Divider/>
                            <div style={{
                                textAlign: 'left'
                            }}>
                                <p>
                                    <ContactsOutlined
                                        style={{
                                            marginRight: 8,
                                        }}
                                    />
                                    {userDetailInfo.username}
                                </p>
                                <p>
                                    <ContactsOutlined
                                        style={{
                                            marginRight: 8,
                                        }}
                                    />
                                    {userDetailInfo.gender == 1 ? "男" : "女"}
                                </p>
                                <p>
                                    <MailOutlined
                                        style={{
                                            marginRight: 8,
                                        }}
                                    />
                                    {userDetailInfo.email}
                                </p>
                                <p>
                                    <HomeOutlined
                                        style={{
                                            marginRight: 8,
                                        }}
                                    />
                                    {userDetailInfo.address}
                                </p>
                                <p>
                                    <MobileOutlined
                                        style={{
                                            marginRight: 8,
                                        }}
                                    />
                                    {userDetailInfo.phone}
                                </p>
                                <UploadMusicFile />
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={17} xl={17}>
                    <Card
                        tabList={operationTabList}
                        activeTabKey={tabKey}
                        onTabChange={(keyValue) => {
                            setTabKey(keyValue)
                        }}
                    >
                        {renderChildrenByTabKey(tabKey)}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default AccountCenter;