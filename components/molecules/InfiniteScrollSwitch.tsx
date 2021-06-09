import { css, cx } from '@emotion/css';
import React, { forwardRef, Ref, useContext } from 'react';
import { InfiniteScrollContext } from '../../context/InfiniteScrollContext';
import globalCss from '../../styles/global-css';
import Icon from '../atoms/Icon';
import Switch from '../atoms/Switch';

interface InfiniteScrollSwitchProps {
  title?: string;
  ariaLabel?: string;
}

const InfiniteScrollSwitch = forwardRef(({ title, ariaLabel }: InfiniteScrollSwitchProps, ref: Ref<HTMLButtonElement>): React.ReactElement => {
  const [isInfiniteLoad, setInfiniteLoad] = useContext(InfiniteScrollContext);

  const infiniteScrollHandling = (event: React.FormEvent<HTMLButtonElement>) => {
    setInfiniteLoad(isInfiniteLoad === 'on' ? 'off' : 'on');
  };

  return (
    <Switch
      ref={ref}
      ariaLabel={ariaLabel}
      title={title}
      className={cx(
        { [cssInfiniteScrollSwitch]: true },
        { [cssInfiniteScrollSwitchOn]: isInfiniteLoad === 'on' },
      )}
      checked={isInfiniteLoad === 'on'}
      onClick={infiniteScrollHandling}
    >
      <Icon iconName='magnet' />
    </Switch>
  );
});

export default InfiniteScrollSwitch;

const cssInfiniteScrollSwitch = css`
  span {
    margin-top: 0.1rem;
    font-size: 1.35rem;
  }
`;

const cssInfiniteScrollSwitchOn = css`
  span {
    color: ${globalCss.color.white};
  }
`;