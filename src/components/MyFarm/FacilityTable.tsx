import Table, { ColumnsType } from 'antd/lib/table'
import React from 'react'
import { useMemo } from 'react'
import { IFacilityAvg, IFacilityTable } from '../../interfaces/facility'

interface Props {
  tableData: IFacilityAvg[] | null
}

const FacilityTable = ({ tableData }: Props) => {
  const columns: ColumnsType<IFacilityTable> = useMemo(
    () => [
      {
        title: '날짜',
        dataIndex: 'measureDate',
      },
      {
        title: 'Co2',
        dataIndex: 'avgCo2',
      },
      {
        title: '습도',
        dataIndex: 'avgHumidity',
      },
      {
        title: '조도',
        dataIndex: 'avgIlluminance',
      },
      {
        title: '토양수분',
        dataIndex: 'avgMos',
      },
      {
        title: '급액',
        dataIndex: 'avgPh',
      },
      {
        title: '온도',
        dataIndex: 'avgTmp',
      },
    ],
    []
  )

  if (tableData === null) {
    return null
  }
  return (
    <Table<IFacilityTable>
      columns={columns}
      dataSource={tableData.map(ele => ({
        key: String(ele.measureDate),
        ...ele,
      }))}
    />
  )
}

export default FacilityTable
