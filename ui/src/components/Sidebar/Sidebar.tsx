import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Flex, Menu } from "antd";
import { FaLeaf } from "react-icons/fa6";
import { LuTreeDeciduous } from "react-icons/lu";
import { GoPeople } from "react-icons/go";

const { Sider } = Layout;
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      theme='light'
      trigger={null}
      collapsible
      collapsed={collapsed}
      className='sider'
    >
      <Flex align='center' justify='center'>
        <div className='logo'>
          <FaLeaf />
        </div>
      </Flex>
      <Menu
        mode='inline'
        defaultSelectedKeys={["1"]}
        className='menu-bar'
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "Dashboard",
          },
          {
            key: "2",
            icon: <LuTreeDeciduous />,
            label: "Family Trees",
          },
          {
            key: "3",
            icon: <GoPeople />,
            label: "Family Members",
          },
        ]}
      />
      <Button
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className='triger-btn'
      />
    </Sider>
  );
}
