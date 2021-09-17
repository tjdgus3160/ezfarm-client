import { Form, Input, Button, message } from 'antd'
import React, { useEffect } from 'react'
import { LoginReqType } from '../types'
import Layout from './Layout'

interface Props {
  loading: boolean
  error: Error | null
  login: ({ email, password }: LoginReqType) => void
}

const Login = ({ loading, login, error }: Props) => {
  const onFinish = ({ email, password }: LoginReqType) => {
    login({ email, password })
  }

  useEffect(() => {
    if (error) {
      message.error('Unknown error occured')
    }
  }, [error])

  return (
    <Layout>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h2>로그인</h2>
        <Form.Item
          label="이메일"
          name="email"
          rules={[{ required: true, message: '이메일을 입력해주세요!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            로그인
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default Login
