import {
  UserOutlined,
  ProfileOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Flex, Menu } from "antd";
import { FaLeaf } from "react-icons/fa6";
import { LuTreeDeciduous } from "react-icons/lu";
import { GoPeople } from "react-icons/go";

export default function Sidebar() {
  return (
    <>
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
          {
            key: "4",
            icon: <ProfileOutlined />,
            label: "My Profile",
          },
          {
            key: "5",
            icon: <SettingOutlined />,
            label: "Settings",
          },
          {
            key: "6",
            icon: <LogoutOutlined />,
            label: "Logout",
          },
        ]}
      />
    </>
  );
}
