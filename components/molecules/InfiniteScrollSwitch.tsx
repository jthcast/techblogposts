import { css, cx } from '@emotion/css';
import React, { useContext } from 'react';
import { InfiniteScrollContext } from '../../context/InfiniteScrollContext';
import globalCss from '../../styles/global-css';
import { IconTemplate } from '../atoms/Icons';
import Switch from '../atoms/Switch';

const InfiniteScrollSwitch = (): React.ReactElement => {
  const [isInfiniteLoad, setInfiniteLoad] = useContext(InfiniteScrollContext);

  const infiniteScrollHandling = (event: React.FormEvent<HTMLButtonElement>) => {
    setInfiniteLoad(isInfiniteLoad === 'on' ? 'off' : 'on');
  };

  return (
    <Switch
      className={cssInfiniteScrollSwitch}
      checked={isInfiniteLoad === 'on'}
      onClick={infiniteScrollHandling}
      checkedChildren="🧲"
      unCheckedChildren="🧲"
    />
  );
};

export default InfiniteScrollSwitch;

const cssInfiniteScrollSwitch = css`
  transform: rotate(90deg);
  
  span {
    margin-left: 0.25rem;
    margin-bottom: 0.2rem;
  }
`;