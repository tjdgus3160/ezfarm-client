import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useMainFarm from '../../hooks/useMainFarm';
import { IScreen } from '../../interfaces/screen';
import ScreenService from '../../services/ScreenService';
import Loading from '../Loading';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ScreenModal = ({ visible, onClose }: Props) => {
  const mainFarm = useMainFarm();
  const [screen, setScreen] = useState<IScreen | null>(null);

  useEffect(() => {
    const init = async () => {
      const screen = await ScreenService.getScreenLive(194);
      setScreen(screen);
    };
    init();
  }, [mainFarm?.id]);

  return (
    <Modal
      title="실시간 화면"
      centered
      visible={visible}
      onCancel={onClose}
      width={1000}
      footer={[]}
    >
      {screen === null ? (
        <Loading />
      ) : (
        <Wrapper>
          <div className="img-box">
            {/* <img src={farmView?.imageUrl} alt="이미지" /> */}
            <img src={screen.imageUrl} alt="이미지" />
          </div>
          <ImgTime>{screen.measureTime}:00</ImgTime>
          <div>
            <Stick wt={screen.cropCondition} />
            <span>숙도 판별 {screen.cropCondition}%</span>
          </div>
        </Wrapper>
      )}
    </Modal>
  );
};

const Wrapper = styled.div`
  /* border: 1px solid gray; */
  display: flex;
  flex-direction: column;
  padding: 30px;
  .img-box {
    width: 450px;
    height: min-content;
    img {
      width: 100%;
    }
  }
  & > div {
    position: relative;
    align-self: center;
    width: 90%;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #b6da72;

    & > span:last-child {
      position: absolute;
      width: 100%;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      font-weight: 700;
    }
  }
`;
const Stick = styled.span<{ wt: number }>`
  position: absolute;
  height: 100%;
  width: ${(props) => `${props.wt}%`};
  border-radius: 20px;
  background-color: #b6da72;
  left: 0;
`;
const ImgTime = styled.span`
  margin-left: auto;
  font-weight: 600;
`;

export default ScreenModal;
