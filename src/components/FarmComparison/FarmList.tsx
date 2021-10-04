import { StarFilled, StarOutlined } from '@ant-design/icons'
import { Button, Space, Table } from 'antd'
import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { IOtherFarm, IOtherFarmTable } from '../../interfaces/favorite'
import {
  addFavorite as addFavoriteSaga,
  deleteFavorite as deleteFavoriteSaga,
} from '../../redux/modules/favorite'
import { RootState } from '../../redux/modules/rootReducer'

interface Props {
  selectFarm: (farm: IOtherFarm) => void
}

const FarmList = ({ selectFarm }: Props) => {
  const dispatch = useDispatch()
  const favorite = useSelector((state: RootState) => state.favorite.favorite)
  const otherFarms = useSelector((state: RootState) => state.farm.otherFarms)

  const addFavorite = useCallback(
    (farmId: number) => {
      dispatch(addFavoriteSaga(farmId))
    },
    [dispatch]
  )

  const deleteFavorite = useCallback(
    (favoriteId: number) => {
      dispatch(deleteFavoriteSaga(favoriteId))
    },
    [dispatch]
  )

  const columns = useMemo(
    () => [
      {
        title: '',
        dataIndex: 'favorite',
        render: (_: any, { key, favorite }: IOtherFarmTable) => (
          <>
            {favorite ? (
              <StarFilled
                onClick={() => {
                  deleteFavorite(Number(key))
                }}
              />
            ) : (
              <StarOutlined
                onClick={() => {
                  addFavorite(Number(key))
                }}
              />
            )}
          </>
        ),
      },
      {
        title: '농가코드',
        dataIndex: 'farmId',
      },
      {
        title: '지역',
        dataIndex: 'address',
      },
      {
        title: '재배면적',
        dataIndex: 'area',
      },

      {
        title: '품종',
        dataIndex: 'cropType',
      },
      {
        title: '종류',
        dataIndex: 'farmType',
      },
      {
        title: '기타',
        dataIndex: 'name',
      },
      {
        title: '',
        render: (_: any, farm: IOtherFarmTable) => (
          <Space size="middle">
            <Button
              onClick={() => {
                selectFarm(farm)
              }}
            >
              조회
            </Button>
          </Space>
        ),
      },
    ],
    [addFavorite, deleteFavorite, selectFarm]
  )

  return (
    <Wrapper>
      <Table<IOtherFarmTable>
        columns={columns}
        dataSource={favorite?.map(ele => ({
          ...ele.farmSearchResponse,
          key: String(ele.favoriteId),
          favorite: true,
        }))}
      />
      {otherFarms && (
        <Table<IOtherFarmTable>
          columns={columns}
          dataSource={otherFarms?.map(ele => ({
            ...ele,
            key: String(ele.farmId),
            favorite: false,
          }))}
          scroll={{ y: 320 }}
        />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 900px;
`

export default FarmList
