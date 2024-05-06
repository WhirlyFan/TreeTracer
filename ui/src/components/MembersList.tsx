import { Button, Flex, Typography } from "antd";

export default function MembersList() {
  return (
    <>
      <Flex align='center' justify='space-between'>
        <Typography.Title level={3} className='primary--color'>
          My Family Members
        </Typography.Title>
        <Button type='link' className='gray--color'>
          View All
        </Button>
      </Flex>
      <Flex align='center' gap='large'>
        {/* replace with family member cards, use antd cards */}
        <div className='member-card'>
          <Typography.Title level={4}>John Doe</Typography.Title>
          <Typography.Text type='secondary'>Father</Typography.Text>
        </div>
        <div className='member-card'>
          <Typography.Title level={4}>Jane Doe</Typography.Title>
          <Typography.Text type='secondary'>Mother</Typography.Text>
        </div>
        <div className='member-card'>
          <Typography.Title level={4}>Baby Doe</Typography.Title>
          <Typography.Text type='secondary'>Child</Typography.Text>
        </div>
      </Flex>
    </>
  );
}
