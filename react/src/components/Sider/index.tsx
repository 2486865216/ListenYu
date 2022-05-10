import { FC } from "react";
import { Menu } from "antd";
import Icon from "@ant-design/icons";
import {
  Video,
  Music,
  Radio,
  Recommended,
  MyLove,
  RecentPlay,
  Audition,
  Local,
} from "../Icon/MyIcon";
import {useNavigate} from "react-router-dom";

const { SubMenu } = Menu;

const Sider: FC = () => {
  const navigate = useNavigate()
  const select = (e) => {
    if (e.key === '1'){
      navigate("/")
    }else if (e.key === '2'){
      navigate(`musicList/1`)
    }else {
      navigate("notFount")
    }
  }
  return (
    <>
      <Menu onClick={select} defaultSelectedKeys={["1"]} mode="inline" theme="light">
        <Menu.ItemGroup key="g1" title="在线音乐">
          <Menu.Item key="1">
            <Icon component={Recommended} />
            推荐
          </Menu.Item>
          <Menu.Item key="2">
            <Icon component={Music} />
            音乐馆
          </Menu.Item>
          <Menu.Item key="3">
            <Icon component={Video} />
            视频
          </Menu.Item>
          <Menu.Item key="4">
            <Icon component={Radio} />
            电台
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="我的音乐">
          <Menu.Item key="5">
            <Icon component={MyLove} />
            我喜欢
          </Menu.Item>
          <Menu.Item key="6">
            <Icon component={Local} />
            本地和下载
          </Menu.Item>
          <Menu.Item key="7">
            <Icon component={RecentPlay} />
            最近播放
          </Menu.Item>
          <Menu.Item key="8">
            <Icon component={Audition} />
            试听列表
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup>
          <SubMenu key={"sub1"} title={"创建的歌单"}>
            <Menu.Item key="99">
              <Icon component={Audition} />
              试听列表
            </Menu.Item>
            <Menu.Item key="91">
              <Icon component={Audition} />
              试听列表
            </Menu.Item>
            <Menu.Item key="92">
              <Icon component={Audition} />
              试听列表
            </Menu.Item>
          </SubMenu>
        </Menu.ItemGroup>
        <Menu.ItemGroup>
          <SubMenu key={"sub2"} title={"收藏的歌单"}/>
        </Menu.ItemGroup>
      </Menu>
    </>
  );
};
export default Sider;
