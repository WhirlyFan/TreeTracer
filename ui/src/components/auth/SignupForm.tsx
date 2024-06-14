import { Form, Input, Button } from "antd";
import { useSignupMutation } from "app/apiSlice";
import { ErrorType, User } from "app/types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [signup] = useSignupMutation();
  const navigate = useNavigate();

  const onFinish = async (values: User) => {
    try {
      await signup({
        username: values.username,
        email: values.email,
        password: values.password,
      }).unwrap();
      setErrors([]);
      navigate("/");
    } catch (e) {
      const error = e as ErrorType;
      setErrors(error.data.errors);
    }
  };

  return (
    <div className='signup-form-container'>
      <h4 className='signup-form-title'>Sign Up</h4>
      {errors.length > 0 && (
        <div className='signup-form-error'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      )}
      <Form
        name='signup'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder='Username' />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type='email' placeholder='Email' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder='Password' />
        </Form.Item>
        <Form.Item
          name='repeatPassword'
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please repeat your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password placeholder='Repeat Password' />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='signup-form-button'
          >
            Sign Up
          </Button>
          Already have an account? &nbsp;
          <Link to='/login' className='login-form-register'>
            Login!
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;
