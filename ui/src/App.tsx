import { useState } from "react";
import "./App.less";
import { Button, Flex, Layout } from "antd";
import Sidebar from "components/Sidebar";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import CustomHeader from "components/Header";
import MainContent from "components/MainContent";

const { Sider, Header, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout>
        <Sider
          theme='light'
          trigger={null}
          collapsible
          collapsed={collapsed}
          className='sider'
        >
          <Sidebar />
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className='triger-btn'
          />
        </Sider>
        <Layout>
          <Header className='header'>
            <CustomHeader />
          </Header>
          <Content className='content'>
            <Flex gap='large'>
              <MainContent />
              {/* <SideContent /> */}
            </Flex>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;

{
  /* <nav>
<ul>
  <li>
    <Link to='/'>Home</Link>
  </li>
  <li>
    <Link to='/login'>Login</Link>
  </li>
  <li>
    <Link to='/signup'>Signup</Link>
  </li>
  <li>
    <Link to='/users'>Users</Link>
  </li>
</ul>
</nav>
<Routes>
<Route path='/login' element={<LoginForm />} />
<Route path='/signup' element={<SignupForm />} />
<Route path='/users' element={<Users />} />
<Route path='/' element={<HomePage />} />
</Routes> */
}
