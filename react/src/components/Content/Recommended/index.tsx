import { FC } from "react";
import MyCard from "./MyCard";
import {Row, Col, Divider} from 'antd';


const Recommended: FC = () => {
  return (
    <>
          <span style={{ fontSize: "3em" }}>推荐</span>
          <br />
          <span style={{ fontSize: "2em" }}>Hi,。。。今日为你推荐</span>
          <Row justify="space-around">
            <Col span={6}>
             <MyCard />
            </Col>
            <Col span={3}>
             <MyCard />
            </Col>
            <Col span={3}>
             <MyCard />
            </Col>
            <Col span={3}>
             <MyCard />
            </Col>
          </Row>
    </>
  );
};
export default Recommended;
