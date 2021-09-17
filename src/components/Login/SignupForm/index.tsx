import React, { useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import styles from './style.module.css'
import { SignupReqType } from '../../../types'

interface Props {
  loading: boolean
  error: Error | null
  signup: ({ name, email, password }: SignupReqType) => void
  change: () => void
}

const SignupForm = ({ loading, error, signup, change }: Props) => {
  const onFinish = ({ name, email, password }: SignupReqType) => {
    signup({ name, email, password })
  }

  useEffect(() => {
    if (error) {
      message.error('이미 존재하는 이메일 입니다.')
    }
  }, [error])

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      className={styles.form}
    >
      <h2 className={styles.form__title}>회원가입</h2>
      <Form.Item
        label={<label className={styles.input__label}>이름</label>}
        name="name"
        rules={[{ required: true, message: '이름을 입력해주세요!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<label className={styles.input__label}>이메일</label>}
        name="email"
        rules={[{ required: true, message: '이메일을 입력해주세요!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<label className={styles.input__label}>비밀번호</label>}
        name="password"
        rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button
          className={styles.form__btn}
          htmlType="submit"
          loading={loading}
        >
          회원가입
        </Button>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 12 }}>
        <span onClick={change}>계정이 있으신가요?</span>
      </Form.Item>
    </Form>
  )
}

export default SignupForm
