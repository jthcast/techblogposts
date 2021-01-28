import { css, cx } from '@emotion/css';
import React, { useContext } from 'react';
import { InfiniteScrollContext } from '../../context/InfiniteScrollContext';
import globalCss from '../../styles/global-css';
import { IconMagnetColored, IconTemplate } from '../atoms/Icons';
import Switch from '../atoms/Switch';

const InfiniteScrollSwitch = (): React.ReactElement => {
  const [isInfiniteLoad, setInfiniteLoad] = useContext(InfiniteScrollContext);

  const infiniteScrollHandling = (event: React.FormEvent<HTMLButtonElement>) => {
    setInfiniteLoad(isInfiniteLoad === 'on' ? 'off' : 'on');
  };

  return (
    <Switch
      ariaLabel="자동 글 불러오기"
      className={cssInfiniteScrollSwitch}
      checked={isInfiniteLoad === 'on'}
      onClick={infiniteScrollHandling}
    >
      <IconMagnetColored />
    </Switch>
  );
};

export default InfiniteScrollSwitch;

const cssInfiniteScrollSwitch = css`
  span {
    margin-top: 0.1rem;
    font-size: 1.35rem;
  }
`;