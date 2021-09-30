import React from 'react'
import styled from 'styled-components'
import useToggle from '../../hooks/useToggle'
import ControlModal from '../Modal/ControlModal'

const ModalTap = () => {
  const [controlModalVisible, toggleControlModal] = useToggle(false)
  const [viewModalVisible, toggleViewModal] = useToggle(false)
  const [farmsModalVisible, toggleFarmsModal] = useToggle(false)

  return (
    <Wrapper>
      <div onClick={toggleControlModal}>실시간 제어</div>
      {controlModalVisible && (
        <ControlModal
          visible={controlModalVisible}
          onClose={toggleControlModal}
        />
      )}
      <div onClick={toggleViewModal}>실시간 화면</div>
      {/* <ModalPortal>
        <ControlModal
          visible={controlModalVisible}
          onClose={toggleControlModal}
        />
      </ModalPortal> */}
      <div onClick={toggleFarmsModal}>농가 선택</div>
      {/* <ModalPortal>
        <ControlModal
          visible={controlModalVisible}
          onClose={toggleControlModal}
        />
      </ModalPortal> */}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 10px;
  div {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background: white;
    text-align: center;
    line-height: 100px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
    cursor: pointer;
    &:active {
      transform: scale(0.95);
    }
    &:hover {
      background: rgba(153, 198, 68);
    }
  }
`

export default ModalTap
