import {
  MessageOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Flex, Typography } from "antd";
import Search from "antd/es/input/Search";

export default function CustomHeader() {
  return (
    <>
      <Flex align='center' justify='space-between'>
        <Typography.Title level={3} type='secondary'>
          Welcome back, Test
        </Typography.Title>
        <Flex align='center' gap='3rem'>
          <Search placeholder='Search Dashboard' allowClear />
          <Flex align='center' gap='10px'>
            <MessageOutlined className="header-icon" />
            <NotificationOutlined className="header-icon" />
            <Avatar icon={<UserOutlined />} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
