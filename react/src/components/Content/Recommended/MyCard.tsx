import { FC } from 'react';
import {Card} from 'antd';

const {Meta} = Card


interface mineCard{
  description?:string
}

const MyCard:FC<mineCard> = (props) => {
    return (
        <Card
            bordered
            hoverable
            headStyle={{fontSize: 16}}
            
            cover={
              <img
                style={{height:256}}
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            <Meta style={{textAlign:'center'}} description={props.description} />
          </Card>
    )
}
export default MyCard;