import {FC, useEffect} from "react";
import { Card, Row, Col } from "antd";
import RecommendedCard from "../../components/RecommendedCard";
import {useNavigate} from "react-router-dom";
import {initRabbit} from "../../service/rabbit";

const Recommended: FC = () => {
    const data = [
        {
            id: 1,
            content: "每日推荐"
        },
        {
            id: 2,
            content: "每日推荐"
        },
        {
            id: 3,
            content: "每日推荐"
        },
        {
            id: 4,
            content: "每日推荐"
        },
    ]
    useEffect(() => {
        initRabbit()
    },[0])
    const navigate = useNavigate()
    const getMusicData = (id: number) => {
        navigate("/musicList/recommended/" + id)
    }
    const card = (id: number, content: string) => (
        <Card onClick={() => getMusicData(id)}>
            <RecommendedCard content={content} />
        </Card>
    )
  return (
    <div>
      <Row justify={"space-around"}>
        {
            data.map((item) => {
                return (
                    <Col key={item.id} xs={10} sm={10} md={10} lg={10} xl={10}>
                        {card(item.id ,item.content)}
                    </Col>
                )
            })
        }
      </Row>
    </div>
  );
};
export default Recommended;
