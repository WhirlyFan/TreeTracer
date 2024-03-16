import { Typography, Button, Row, Col, Image } from 'antd';
import styles from './Landing.module.less';

const { Title, Paragraph } = Typography;

function Landing() {
  return (
    <div className={styles.body}>
      <Row justify="center" align="middle" className={styles.row}>
        <Col span={16}>
          <Title level={1}>Welcome to TreeTracer</Title>
          <Paragraph>
            Your job application tracking made easy. Keep track of your job
            applications, interviews, and offers with TreeTracer.
          </Paragraph>
          <Button type="primary" size="large" href="/signup">
            Get Started
          </Button>
        </Col>
        <Col span={8}>
          {/* TODO: Add an image or illustration here for the logo*/}
          <Image
            src="https://designshack.net/wp-content/uploads/placehold.jpg"
            width={500}
            placeholder
            alt="TreeTracer Logo"
            preview={false}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Landing;
