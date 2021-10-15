import { Button, Form, InputNumber, Switch } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useCallback, useEffect, useState } from 'react'
import useInput from '../../hooks/useInput'
import useMainFarm from '../../hooks/useMainFarm'
import { IControllerReq, IControllerRes } from '../../interfaces/controller'
import ControllerService from '../../services/ControllerService'
import { onoffConvert } from '../../utils/utils'
import Loading from '../Loading'

interface Props {
  visible: boolean
  onClose: () => void
}

const ControlModal = ({ visible, onClose }: Props) => {
  const mainFarm = useMainFarm()
  const [value, setValue] = useState<IControllerRes | null>(null)
  const [temperature, onChangeTemperature] = useInput(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const init = async () => {
      // const currentValue = await ControllerService.getValue(mainFarm.id)
      // setValue(currentValue)
      // onChangeTemperature(currentValue.temperature)
      setValue({
        co2: 'OFF',
        createdDate: '',
        id: 1,
        illuminance: 'OFF',
        temperature: 26,
        updatedDate: 'OFF',
        water: 'OFF',
      })
    }
    init()
  }, [mainFarm?.id, onChangeTemperature])

  const onSubmit = useCallback(
    async ({ water, temperature, illuminance, co2 }) => {
      try {
        setLoading(true)
        const value: IControllerReq = {
          remoteId: mainFarm.id,
          water: onoffConvert(water),
          temperature,
          illuminance: onoffConvert(illuminance),
          co2: onoffConvert(co2),
        }
        await ControllerService.setValue(value)
      } catch (e) {}
      setLoading(false)
      onClose()
    },
    [mainFarm.id, onClose]
  )

  return (
    <Modal
      title="실시간 제어"
      centered
      visible={visible}
      onCancel={onClose}
      width={300}
      footer={[]}
    >
      {value === null ? (
        <Loading />
      ) : (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onSubmit}
          autoComplete="off"
          className="form"
        >
          <Form.Item name="water" label="급수 제어">
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              defaultChecked={value.water === 'OFF' ? false : true}
            />
          </Form.Item>
          <Form.Item name="temperature" label="온도 제어">
            <InputNumber
              min={20}
              max={40}
              value={temperature}
              onChange={onChangeTemperature}
            />
          </Form.Item>

          <Form.Item name="illuminance" label="조도 제어">
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              defaultChecked={value.illuminance === 'OFF' ? false : true}
            />
          </Form.Item>
          <Form.Item name="co2" label="CO2 제어">
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              defaultChecked={value.co2 === 'OFF' ? false : true}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button className="form__btn" htmlType="submit" loading={loading}>
              설정
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}

export default ControlModal
