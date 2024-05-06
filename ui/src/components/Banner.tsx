import { Button, Card, Flex, Typography } from "antd";

export default function Banner() {
  return (
    <Card style={{ height: 260, padding: "20px" }}>
      <Flex vertical gap='30px'>
        <Flex vertical align='flex-start'>
          <Typography.Title level={2}>
            Create Family Trees!
          </Typography.Title>
          <Typography.Text type='secondary' strong>
            Create your family tree and connect with your family members.
          </Typography.Text>
        </Flex>
        <Flex gap='large'>
          <Button type='primary' size='large'>
            Create a Family Tree
          </Button>
          <Button size='large'>
            View My Trees
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
