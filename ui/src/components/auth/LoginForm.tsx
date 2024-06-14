import { Alert, Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useLoginMutation } from "app/apiSlice";
import { ErrorType, User } from "app/types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.less";

export default function LoginForm() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [errors, setErrors] = useState([]);

  const onFinish = async (values: User) => {
    try {
      await login({ email: values.email, password: values.password }).unwrap();
      setErrors([]);
      navigate("/");
    } catch (e) {
      const error = e as ErrorType;
      setErrors(error.data.errors);
    }
  };

  return (
    <Form name='login-form' onFinish={onFinish} className='login-form'>
      <h1 className='login-form-title'>Login</h1>
      {errors.length > 0 && (
        <Alert
          message='Error'
          description={errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
          type='error'
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Form.Item
        name='email'
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          type='email'
          placeholder='Email'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Login
        </Button>
        Or{" "}
        <Link to='/signup' className='login-form-register'>
          Register Now!
        </Link>
      </Form.Item>
    </Form>
  );
}
