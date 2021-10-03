import Table, { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import { useMemo } from 'react'
import { IFacilityAvg, IFacilityTable } from '../../interfaces/facility'

interface Props {
  tableData: IFacilityAvg[] | null
}

const FacilityTable = ({ tableData }: Props) => {
  const [value, setValue] = useState<IFacilityTable[] | null>()
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

  useEffect(() => {
    if (tableData) {
      const data: IFacilityTable[] = tableData.map(ele => ({
        key: String(ele.measureDate),
        ...ele,
      }))
      setValue(data)
    }
  }, [tableData])

  if (!value) {
    return null
  }
  return <Table<IFacilityTable> columns={columns} dataSource={value} />
}

export default FacilityTable
