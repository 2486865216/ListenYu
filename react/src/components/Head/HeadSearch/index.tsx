import { FC } from 'react';
import {Input, message} from 'antd';
import {useNavigate} from "react-router-dom";

const {Search} = Input;


const HeadSearch:FC = (props) => {
    const navigate = useNavigate()
    const search = async (value: string) => {
        if (value == null || value.trim().length === 0) {
            message.info("输入内容能为空!")
            return;
        }
        navigate(`musicList/${value}`)
    }
    return (
        <Search placeholder='input search text' onSearch={search} enterButton/>
    )
}
export default HeadSearch;