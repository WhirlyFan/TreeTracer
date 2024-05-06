import { MessageOutlined, NotificationOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import Search from "antd/es/input/Search";
import DropdownAvatar from "./DropdownAvatar";

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
            <MessageOutlined className='header-icon' />
            <NotificationOutlined className='header-icon' />
            <DropdownAvatar />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
