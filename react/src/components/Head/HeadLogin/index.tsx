import {FC, useEffect, useState} from 'react';
import {Avatar, Badge, Tooltip, Button, Dropdown, Menu} from 'antd';
import {Link, useNavigate} from 'react-router-dom';

type userInfoType = {
    avatar: string,
    id: number,
    password: string,
    username: string
}

const HeadLogin: FC = () => {
    const [userInfo, setUserInfo] = useState<userInfoType>({
        avatar: null,
        id: -1,
        password: null,
        username: null,
    })
    useEffect(() => {
        const info = JSON.parse(sessionStorage.getItem("userInfo"))
        setUserInfo({...info})
    }, [0])
    const loginOut = () => {
        sessionStorage.removeItem("userInfo")
        setUserInfo({
            avatar: null,
            id: -1,
            password: null,
            username: null,
        })
    }

    const navigate = useNavigate();

    const selected = (e) => {
        if (e.key === '1'){
            navigate("userInfo")
        }
        if (e.key === '2'){
            loginOut()
        }
    }

    const menu = (
        <Menu onClick={selected}>
            <Menu.Item key={1}>
                个人中心
            </Menu.Item>
            <Menu.Item key={2}>
                注销
            </Menu.Item>
        </Menu>
    )

    const login = ({
        userinfo: (
            <div style={{
                textAlign: 'center'
            }}>
                <Dropdown overlay={menu} placement={"bottom"}>
                    <Badge count={0}>
                        <Avatar src={userInfo.avatar}/>
                    </Badge>
                </Dropdown>
                <span style={{marginLeft: 20}}>
                    <b>
                    {userInfo.username}
                    </b>
                </span>
            </div>
        ),
        loginButton: (
            <div style={{textAlign: "center"}}>
                <Link to={"login"}><Button type="primary">登录</Button></Link>
            </div>
        )
    })

    return userInfo.username ? (
        login.userinfo
    ) : (
        login.loginButton
    )
}
export default HeadLogin;