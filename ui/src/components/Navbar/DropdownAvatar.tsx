import {
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Spin } from "antd";
import { useGetCurrentUserQuery, useLogoutMutation } from "app/apiSlice";
import { useNavigate } from "react-router-dom";

export default function DropdownAvatar() {
  const [logout, status] = useLogoutMutation();
  const { data, isLoading: userLoading } = useGetCurrentUserQuery({});
  const currentUser = data && data.user;
  const navigate = useNavigate();

  const loggedOutItems: MenuProps["items"] = [
    {
      key: "4",
      label: (
        <div
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </div>
      ),
      icon: <LoginOutlined />,
    },
    {
      key: "5",
      label: (
        <div
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </div>
      ),
      icon: <UserAddOutlined />,
    },
  ];

  const loggedInItems: MenuProps["items"] = [
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
    <Dropdown
      menu={{ items: currentUser ? loggedInItems : loggedOutItems }}
      disabled={userLoading}
    >
      <Avatar icon={<UserOutlined />} />
    </Dropdown>
  );
}
