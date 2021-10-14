/* eslint-disable no-restricted-globals */
import { Button, Modal, Space, Table } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import useFarms from '../../hooks/useFarms'
import useToggle from '../../hooks/useToggle'
import { IFarm, IFarmTable } from '../../interfaces/farm'
import FarmEditModal from './FarmEditModal'
import FarmEnrollModal from './FarmEnrollModal'
import { useDispatch } from 'react-redux'
import { deleteFarm } from '../../redux/modules/farm'

interface Props {
  visible: boolean
  onClose: () => void
}

const FarmsModal = ({ visible, onClose }: Props) => {
  const farms = useFarms()
  const dispatch = useDispatch()

  const [farmEnrollModalVisible, toggleFarmEnrollModal] = useToggle(false)
  const [farmEditModalVisible, toggleFarmEditModal] = useToggle(false)

  const [farmId, setFarmId] = useState<number | null>(null)

  const showConfirm = useCallback(
    (farmId: number) => {
      return Modal.confirm({
        title: '정말로 삭제하시겠습니까?',
        icon: <ExclamationCircleOutlined />,
        style: { top: 300 },
        onOk() {
          dispatch(deleteFarm(farmId))
        },
      })
    },
    [dispatch]
  )

  const columns: ColumnsType<IFarmTable> = useMemo(
    () => [
      {
        title: '',
        dataIndex: 'main',
        key: 'main',
        align: 'center',
        render: (_, { main }: IFarmTable) => (
          <Space size="middle">{main && <Dot />}</Space>
        ),
      },
      {
        title: '종류',
        dataIndex: 'farmType',
      },
      {
        title: '농가명',
        dataIndex: 'name',
      },
      {
        title: '작물종류',
        dataIndex: 'cropType',
      },
      {
        title: '주소',
        dataIndex: 'address',
      },
      {
        title: '등록일시',
        dataIndex: 'startDate',
      },
      {
        title: 'option',
        width: 200,
        render: (_, { key, main }: IFarmTable) => (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                toggleFarmEditModal()
                setFarmId(Number(key))
              }}
            >
              수정
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                showConfirm(Number(key))
              }}
            >
              삭제
            </Button>
            {!main && <Button type="link">선택</Button>}
          </Space>
        ),
      },
    ],
    [showConfirm, toggleFarmEditModal]
  )

  const dataSource: IFarmTable[] = useMemo(
    () =>
      farms.map(
        ({
          id,
          main,
          farmType,
          name,
          cropType,
          address,
          startDate,
        }: IFarm) => ({
          key: String(id),
          main,
          farmType,
          name,
          cropType,
          address,
          startDate,
        })
      ),
    [farms]
  )

  return (
    <Modal
      title="나의 농가 목록"
      centered
      visible={visible}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key={1} onClick={toggleFarmEnrollModal}>
          농가등록
        </Button>,
      ]}
    >
      <Table<IFarmTable>
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
      {farmEnrollModalVisible && (
        <FarmEnrollModal
          visible={farmEnrollModalVisible}
          onClose={toggleFarmEnrollModal}
        />
      )}
      {farmEditModalVisible && farmId && (
        <FarmEditModal
          visible={farmEditModalVisible}
          onClose={toggleFarmEditModal}
          farmId={farmId}
        />
      )}
    </Modal>
  )
}

const Dot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #f16b6f;
`

export default FarmsModal
