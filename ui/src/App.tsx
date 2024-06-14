import "./App.less";
import { useGetCurrentUserQuery } from "app/apiSlice";
import { Empty, Layout, Skeleton } from "antd";
import Navbar from "components/Navbar/Navbar";
import MainRoutes from "components/Routes/MainRouting";

const { Header, Content, Sider } = Layout;

function App() {
  const { data, isLoading, isError } = useGetCurrentUserQuery({});

  // TODO: Add a loading spinner
  // <Skeleton active loading={isLoading}/>;
  if (isLoading) return <Skeleton active />;
  if (isError)
    return <Empty description='An error occurred while loading the user' />;

  const currentUser = data && data.user;

  return (
    <>
      <Layout>
        <Sider>
          <div className='logo' />
        </Sider>
        <Layout>
          <Header>
            <Navbar />
          </Header>
          <Content>
            <MainRoutes currentUser={currentUser} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
