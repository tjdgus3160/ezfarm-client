import { Button, Form, Input, Modal } from 'antd'
import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { CloseOutlined, UploadOutlined } from '@ant-design/icons'
import { IMe } from '../../interfaces/user'
import { RootState } from '../../redux/modules/rootReducer'
import { ChangeEvent } from 'react'
import { editProfile } from '../../redux/modules/user'

interface Props {
  visible: boolean
  onClose: () => void
}

const ProfileModal = ({ visible, onClose }: Props) => {
  const dispatch = useDispatch()
  const me = useSelector<RootState, IMe>(
    (state: RootState) => state.user.me as IMe
  )

  const [currentImage, setCurrentImage] = useState<string | null>(me.imageUrl)
  const [image, setImage] = useState<File | null>(null)
  const [isDefaultImage, setIsDefaultImage] = useState('N')

  const imageInput = useRef<HTMLInputElement>(null)
  const imageUpload = useCallback(() => {
    if (!imageInput.current) return
    imageInput.current.click()
  }, [imageInput])
  const onChangeImages = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setImage(e.target.files[0])
    setIsDefaultImage('N')
  }, [])
  const removeImage = useCallback(() => {
    if (currentImage) {
      setCurrentImage(null)
    } else {
      setImage(null)
    }
    setIsDefaultImage('Y')
  }, [currentImage])

  const onSubmit = useCallback(
    value => {
      try {
        const data = new FormData()
        if (image) {
          data.append('image', image)
        }
        if (value.phoneNumber) {
          data.append('phoneNumber', value.phoneNumber)
        }
        if (value.address) {
          data.append('address', value.address)
        }
        data.append('isDefaultImage', String(isDefaultImage))
        dispatch(editProfile(data))
      } catch (e) {}
      onClose()
    },
    [dispatch, onClose, image, isDefaultImage]
  )
  return (
    <Modal
      title="회원정보 수정"
      centered
      visible={visible}
      onCancel={onClose}
      width={400}
      footer={[]}
    >
      <Form
        name="basic"
        wrapperCol={{ span: 8 }}
        labelCol={{ span: 6 }}
        initialValues={{
          phoneNumber: me.phoneNumber,
          address: me.address,
        }}
        onFinish={onSubmit}
        autoComplete="off"
        className="form"
      >
        <Form.Item wrapperCol={{ offset: 0 }}>
          <ImageWrapper>
            {image ? (
              <>
                <Avatar src={URL.createObjectURL(image)} alt="avatar" />
                <DeleteBtn onClick={removeImage}>
                  <CloseOutlined />
                </DeleteBtn>
              </>
            ) : (
              <>
                {currentImage ? (
                  <>
                    <Avatar src={currentImage} alt="avatar" />
                    <DeleteBtn onClick={removeImage}>
                      <CloseOutlined />
                    </DeleteBtn>
                  </>
                ) : (
                  <Avatar src="/images/avatar_default.png" alt="avatar" />
                )}
              </>
            )}
          </ImageWrapper>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9 }}>
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            ref={imageInput}
            onChange={onChangeImages}
          />
          <Button icon={<UploadOutlined />} onClick={imageUpload}>
            Upload
          </Button>
        </Form.Item>

        <Form.Item label={<label>이메일</label>}>
          <span>{me.email}</span>
        </Form.Item>

        <Form.Item label={<label>이름</label>}>
          <span>{me.name}</span>
        </Form.Item>

        <Form.Item label={<label>전화번호</label>} name="phoneNumber">
          <Input style={{ width: 200 }} placeholder="ex) 02-1234-5678" />
        </Form.Item>
        <Form.Item label={<label>주소</label>} name="address">
          <Input style={{ width: 250 }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9 }}>
          <Button size="middle" htmlType="submit">
            수정하기
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const ImageWrapper = styled.div`
  /* border: 1px solid gray; */
  display: flex;
  justify-content: center;
  position: relative;
`

const DeleteBtn = styled.div`
  position: absolute;
  bottom: 0;
  right: 100px;
  cursor: pointer;
`

const Avatar = styled.img`
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  object-fit: cover;
`

export default ProfileModal
