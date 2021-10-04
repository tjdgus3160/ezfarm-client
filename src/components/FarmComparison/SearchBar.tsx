import { Form, Select } from 'antd'
import React, { useCallback } from 'react'

import styled from 'styled-components'
import { IfarmSearchCond } from '../../interfaces/farm'
import FarmService from '../../services/FarmService'
interface Props {
  search: () => void
}

const SearchBar = ({ search }: Props) => {
  const onClick = useCallback(
    value => {
      const params: IfarmSearchCond = {
        page: 0,
        size: 100,
      }
      for (let key in value) {
        if (value[key]) {
          ;(params as any)[key] = value[key]
        }
      }
      FarmService.setCond(params)
      search()
    },
    [search]
  )

  return (
    <Wrapper>
      <Form layout="inline" onFinish={onClick}>
        <Form.Item name="farmGroup">
          <Select
            showSearch
            style={{ width: 150 }}
            placeholder="농가 선택"
            allowClear
          >
            <Select.Option value="BEST">우수농가</Select.Option>
            <Select.Option value="NORMAL">일반농가</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="farmType">
          <Select
            showSearch
            style={{ width: 150 }}
            placeholder="종류 선택"
            allowClear
          >
            <Select.Option value="VINYL">비닐</Select.Option>
            <Select.Option value="GLASS">유리</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="cropType">
          <Select
            showSearch
            style={{ width: 150 }}
            placeholder="품종 선택"
            allowClear
          >
            <Select.Option value="PAPRIKA">파프리카</Select.Option>
            <Select.Option value="STRAWBERRY">딸기</Select.Option>
            <Select.Option value="TOMATO">토마토</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <SearchBtn>검색</SearchBtn>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* border: 1px solid gray; */
  display: flex;
  justify-content: space-evenly;
  width: 900px;
  background-color: white;
  border-radius: 30px;
  padding: 30px 0;
  margin: 30px 0;
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 30px;
  }
  .ant-select-arrow {
    color: #f16b6f;
  }
`

const SearchBtn = styled.button`
  width: 78px;
  height: 34px;
  border-radius: 17px;
  background-color: #f16b6f;
  font-size: 12px;
  color: #ffffff;
  font-weight: 500;
  text-align: center;
`

export default SearchBar
