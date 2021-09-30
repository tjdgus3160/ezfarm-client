import { Button, Checkbox, DatePicker, Form, Input, Modal, Radio } from 'antd'
import moment from 'moment'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import useFarms from '../../hooks/useFarms'
import { IFarm, IFarmFormData } from '../../interfaces/farm'
import { editFarm } from '../../redux/modules/farm'
import { disabledDate } from '../../utils/utils'

interface Props {
  visible: boolean
  onClose: () => void
  farmId: number
}

const FarmEditModal = ({ visible, onClose, farmId }: Props) => {
  const dispatch = useDispatch()

  const onSubmit = useCallback(
    value => {
      try {
        const farm: IFarmFormData = {
          name: value.name,
          address: value.address,
          phoneNumber: value.phoneNumber,
          farmType: value.farmType,
          cropType: value.cropType,
          area: value.area,
          startDate: value.startDate.format('YYYY-MM-DD'),
          main: value.main.length ? true : false,
        }
        dispatch(editFarm({ farmId, farm }))
      } catch (e) {}
      onClose()
    },
    [dispatch, onClose, farmId]
  )

  const farms = useFarms()
  const farm = farms.find((ele: IFarm) => ele.id === farmId) as IFarm

  return (
    <Modal
      title="농가 등록"
      centered
      visible={visible}
      onCancel={onClose}
      width={700}
      footer={[]}
    >
      <Form
        name="basic"
        wrapperCol={{ span: 16 }}
        initialValues={{
          name: farm.name,
          address: farm.address,
          phoneNumber: farm.phoneNumber,
          farmType: farm.farmType,
          cropType: farm.cropType,
          area: farm.area,
          startDate: moment(farm.startDate),
          main: farm.main ? ['true'] : [],
        }}
        onFinish={onSubmit}
        autoComplete="off"
        className="form"
      >
        <SideImg />
        <Form.Item
          label={<label>농가 이름</label>}
          name="name"
          rules={[
            { required: true, message: '농가명에 표시될 이름을 작성해주세요' },
          ]}
        >
          <Input style={{ width: 200 }} />
        </Form.Item>
        <Form.Item
          label={<label>농가 주소</label>}
          name="address"
          rules={[{ required: true, message: '주소를 입력해 주세요' }]}
        >
          <Input style={{ width: 300 }} />
        </Form.Item>
        <Form.Item label={<label>농가 전화번호</label>} name="phoneNumber">
          <Input style={{ width: 200 }} placeholder="ex) 02-1234-5678" />
        </Form.Item>

        <Form.Item
          label={<label>농가 종류</label>}
          name="farmType"
          rules={[{ required: true, message: '농가 종류를 선택해 주세요' }]}
        >
          <Radio.Group>
            <Radio value="VINYL">비닐</Radio>
            <Radio value="GLASS">유리</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label={<label>작물 종류</label>}
          name="cropType"
          rules={[{ required: true, message: '작물 종류를 선택해 주세요' }]}
        >
          <Radio.Group>
            <Radio value="PAPRIKA">파프리카</Radio>
            <Radio value="STRAWBERRY">딸기</Radio>
            <Radio value="TOMATO">토마토</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={<label>농가 면적</label>}
          name="area"
          rules={[{ required: true, message: '면적을 입력해 주세요' }]}
        >
          <Input style={{ width: 100 }} />
        </Form.Item>
        <Form.Item
          label={<label>농가 생산 시작일</label>}
          name="startDate"
          rules={[{ required: true, message: '면적을 입력해 주세요' }]}
        >
          <DatePicker disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item name="main">
          <Checkbox.Group>
            <Checkbox value="true">대표 농가 설정</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 11 }}>
          <Button size="large" htmlType="submit">
            수정하기
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const SideImg = styled.img.attrs({
  src: '/images/farmer.png',
})`
  position: absolute;
  top: 30%;
  right: -50px;
  width: 500px;
`

export default FarmEditModal
