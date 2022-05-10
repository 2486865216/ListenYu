import {FC, useEffect, useState} from 'react';
import {Form, Input, Button, Checkbox, message} from 'antd';
import {UserOutlined, LockOutlined, TeamOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import './index.less'
import {getCode, getInfo, login} from "../../service/login";


const Login: FC = (props) => {
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        const response = await login(values)
        if (response.data.code == 200) {
            const res = await getInfo(response.data.data.token)
            sessionStorage.setItem("userInfo", JSON.stringify(res.data.data.user))
            navigate('/', {replace: true})
        } else if (response.data.code === 499) {
            message.warn(response.data.data)
            getCodeMessage()
        } else if (response.data.code === 500) {
            message.warn(response.data.data)
        }
    };

    const [image, setImage] = useState<string>();

    const getCodeMessage = async () => {
        const data = await getCode()
        setImage(data.data.data)
    }

    useEffect(() => {
        getCodeMessage()
    }, [0])

    return (
        <div id="loginForm">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{remember: true}}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{required: true, message: 'Please input your Username!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please input your Password!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item
                    name="vrifiCode"
                    rules={[{required: true, message: 'Please input your Verification Code!'}]}
                >
                    <Input prefix={<TeamOutlined  className="site-form-item-icon"/>} placeholder="验证码"/>
                </Form.Item>
                <Form.Item>
                    <img src={image} onClick={getCodeMessage}/>
                </Form.Item>
                {/*<Form.Item>*/}
                {/*    <Form.Item name="remember" valuePropName="checked" noStyle>*/}
                {/*        <Checkbox>Remember me</Checkbox>*/}
                {/*    </Form.Item>*/}

                {/*    /!*<a className="login-form-forgot" href="ww">*!/*/}
                {/*    /!*    忘记密码*!/*/}
                {/*    /!*</a>*!/*/}
                {/*</Form.Item>*/}

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    {/*或者 <a href="ww">注册新账号</a>*/}
                </Form.Item>
            </Form>
        </div>
    );
}
export default Login