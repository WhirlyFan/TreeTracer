import { Button, Menu } from 'antd';
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { User } from 'app/types';

interface NavbarProps {
  user: User | undefined;
  userLoading: boolean;
}

const Navbar = ({ user, userLoading }: NavbarProps) => {
  return (
    // TODO: Convert this to use the items prop instead of Menu.Item
    <Menu mode="horizontal" theme="light" className='flex-right'>
      <Menu.Item key="home">
        <Button type="link" href="/">
          Home
        </Button>
      </Menu.Item>
      <Menu.Item key="login" icon={<UserOutlined />}>
        {!user ? (
          <Button type="link" href="/login" loading={userLoading}>
            Login
          </Button>
        ) : (
          <Button type="link" href="/dashboard">
            Dashboard
          </Button>
        )}
      </Menu.Item>
      <Menu.Item key="signup" icon={<UserAddOutlined />}>
        <Button type="primary" href="/signup">
          Signup
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
