import { FC, Fragment } from 'react';
import HeadSearch from '../HeadSearch';
import HeadLogin from '../HeadLogin';
import { Row, Col } from 'antd';
import "./index.less"

const HeadMain: FC = () => {
    return (
        <Fragment>
            <Row className={'main'} justify='end' align='middle'>
                <Col id='search' span={8}>
                    <HeadSearch />
                </Col>
                <Col span={3} />
                <Col span={8}>
                    <HeadLogin />
                </Col>
            </Row>
        </Fragment>
    )
}
export default HeadMain;