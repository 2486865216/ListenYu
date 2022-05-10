import { FC } from 'react';
import './index.less'

interface myProps {
    content: string
}

const RecommenedCard:FC<myProps> = (props) => {
    return (
        <div id='main'>
            {props.content}
        </div>
    )
}
export default RecommenedCard;