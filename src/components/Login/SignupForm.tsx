import React, { useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { SignupReqType } from '../../interfaces/user'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface Props {
  loading: boolean
  error: Error | null
  signup: ({ name, email, password }: SignupReqType) => void
}

const SignupForm = ({ loading, error, signup }: Props) => {
  const onFinish = ({ name, email, password }: SignupReqType) => {
    signup({ name, email, password })
  }

  useEffect(() => {
    if (error) {
      message.error('이미 존재하는 이메일 입니다.')
    }
  }, [error])

  return (
    <Wrapper>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
        className="form"
      >
        <h2>회원가입</h2>
        <Form.Item
          label={<label>이름</label>}
          name="name"
          rules={[{ required: true, message: '이름을 입력해주세요!' }]}
        >
          <Input />
        </Form.Item>

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
            회원가입
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12 }}>
          <Link to="/login">
            <span className="change_btn">계정이 있으신가요?</span>
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

export default SignupForm
