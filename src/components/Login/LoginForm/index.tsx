import React, { useEffect } from 'react'
import { LoginReqType } from '../../../types'
import { Form, Input, Button, message } from 'antd'
import styles from './style.module.css'

interface Props {
  loading: boolean
  error: Error | null
  login: ({ email, password }: LoginReqType) => void
  change: () => void
}

const LoginForm = ({ loading, error, login, change }: Props) => {
  const onFinish = ({ email, password }: LoginReqType) => {
    login({ email, password })
  }

  useEffect(() => {
    if (error) {
      message.error('로그인에 실패하였습니다.')
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
      <h2 className={styles.form__title}>로그인</h2>
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
          로그인
        </Button>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 12 }}>
        <span onClick={change} className={styles.change_btn}>
          계정이 없으신가요?
        </span>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
