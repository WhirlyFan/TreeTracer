import "./App.less";
import { useGetCurrentUserQuery } from "app/apiSlice";
import { Empty, Layout, Skeleton } from "antd";
import Navbar from "components/Navbar/Navbar";
import MainRoutes from "components/Routes/MainRouting";
import Sidebar from "components/Sidebar/Sidebar";

const { Header, Content } = Layout;

function App() {
  const { data, isLoading, isError } = useGetCurrentUserQuery({});

  if (isLoading) return <Skeleton loading={isLoading} />;
  if (isError)
    return <Empty description='An error occurred while loading the user' />;

  const currentUser = data && data.user;

  return (
    <>
      <Layout>
        {currentUser && <Sidebar />}
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
