import { Layout, Menu, Dropdown, Space, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { mainMenuItems, profileDropdownItems } from 'utils/constants';
import styles from './Dashboard.module.less';
import { useGetCurrentUserQuery, useLogoutMutation } from 'app/apiSlice';
import { useNavigate } from 'react-router-dom';
import { UpOutlined, UserOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const { data: currentUser } = useGetCurrentUserQuery({});

  const handleMenuItem = ({ key }: { key: string }) => {
    switch (key) {
      default:
        break;
    }
  };

  const handleProfileItem = ({ key }: { key: string }) => {
    switch (key) {
      case 'logout':
        logout({});
        navigate('/');
        break;
      case 'home':
        navigate('/');
        break;
      default:
        break;
    }
  };

  return (
    <Layout hasSider className={styles.wrapper}>
      <Sider className={styles.sider}>
        <Menu
          theme="dark"
          mode="inline"
          items={mainMenuItems}
          onClick={handleMenuItem}
        />

        {/* Profile Button */}
        <Dropdown
          className={styles.dropdown}
          placement="top"
          menu={{ items: profileDropdownItems, onClick: handleProfileItem }}
        >
          <Button>
            <Space>
              <UserOutlined />
              {currentUser.user.username}
              <UpOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Sider>

      {/* Dynamic content goes here */}
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          {/* Header component can go here */}
        </Header>

        <Content className={styles.content}>
          {/* Content components can go here */}
        </Content>

        <Footer className={styles.footer}>
          {/* Footer component can go here */}
          <p>Linus's Foot was here 🦶</p>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
