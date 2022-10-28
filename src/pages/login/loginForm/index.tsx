import { Button, Checkbox, Form, Input } from 'antd';
import React,{ useState }from 'react';

import {
  userLogin
} from '../../../service/login'

interface valueProps {
  username: string;
  password: string;
  authority?: string;
}

const App: React.FC = (props) => {
  // const [userInfo,setUserInfo] = useState(null);

  const onFinish = (values: valueProps) => {
    let user = {
      username: values.username,
      password: values.password
    }
    userLogin(user).then(res => {
        if(res[0]) {
          // console.log(res[0]);
          // setUserInfo(res[0]);
          window.location.href = "/home";
        } else {
          alert("帐号或密码错误!")
        }
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 , offset: 0 }}
      wrapperCol={{ span: 18, offset: 0 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='login_form'
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;