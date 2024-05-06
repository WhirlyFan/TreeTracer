import {
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Spin } from "antd";
import { useLogoutMutation } from "app/apiSlice";
import { useNavigate } from "react-router-dom";

export default function DropdownAvatar() {
  const [logout, status] = useLogoutMutation();
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            navigate("/profile");
          }}
        >
          My Profile
        </div>
      ),
      icon: <ProfileOutlined />,
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            navigate("/settings");
          }}
        >
          Settings
        </div>
      ),
      icon: <SettingOutlined />,
    },
    {
      key: "3",
      label: <div onClick={logout}>Logout</div>,
      icon: status.isLoading ? <Spin /> : <LogoutOutlined />,
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Avatar icon={<UserOutlined />} />
    </Dropdown>
  );
}
