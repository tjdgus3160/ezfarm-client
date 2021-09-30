import React, { useEffect } from 'react'
import { LoginReqType } from '../../interfaces/user'
import { Form, Input, Button, message } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface Props {
  loading: boolean
  error: Error | null
  login: ({ email, password }: LoginReqType) => void
}

const LoginForm = ({ loading, error, login }: Props) => {
  const onFinish = ({ email, password }: LoginReqType) => {
    login({ email, password })
  }

  useEffect(() => {
    if (error) {
      message.error('로그인에 실패하였습니다.')
    }
  }, [error])

  return (
    <Wrapper>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className="form"
      >
        <h2>로그인</h2>
        <Form.Item
          label={<label>이메일</label>}
          name="email"
          rules={[{ required: true, message: '이메일을 입력해주세요!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<label>비밀번호</label>}
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button className="form__btn" htmlType="submit" loading={loading}>
            로그인
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12 }}>
          <Link to="/signup">
            <span className="change_btn">계정이 없으신가요?</span>
          </Link>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form {
    width: 400px;
    margin-top: 120px;
    margin-left: 200px;
  }
  h2 {
    padding-left: 70px;
    font-size: 30px;
    font-weight: 800;
    margin-bottom: 20px;
    color: #fff;
  }
  .form__btn {
    border: #ffffff;
    background-color: #ffffff;
    color: #f16b6f;
    width: 100%;
  }

  .form__btn:hover,
  .form__btn:focus {
    background-color: #f16b6f;
    color: #ffffff;
  }

  .change_btn {
    color: white;
    cursor: pointer;
  }
`

export default LoginForm
