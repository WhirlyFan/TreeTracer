import { Button, Flex, Typography } from "antd";

export default function TreesList() {
  return (
    <>
      <Flex align='center' justify='space-between'>
        <Typography.Title level={3} className='primary--color'>
          My Trees
        </Typography.Title>
        <Button type='link' className='gray--color'>
          View All
        </Button>
      </Flex>
      <Flex align="center" gap="large">
        {/* replace with tree cards, use antd cards */}
        <div className='tree-card'>
          <Typography.Title level={4}>Family Tree 1</Typography.Title>
          <Typography.Text type='secondary'>Created on 12th Jan 2021</Typography.Text>
        </div>
        <div className='tree-card'>
          <Typography.Title level={4}>Family Tree 2</Typography.Title>
          <Typography.Text type='secondary'>Created on 12th Jan 2021</Typography.Text>
        </div>
        <div className='tree-card'>
          <Typography.Title level={4}>Family Tree 3</Typography.Title>
          <Typography.Text type='secondary'>Created on 12th Jan 2021</Typography.Text>
        </div>
      </Flex>
    </>
  );
}
