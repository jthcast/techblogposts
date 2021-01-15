import React, { useContext } from 'react';
import { InfiniteScrollContext } from '../../context/InfiniteScrollContext';
import Switch from '../atoms/Switch';

const InfiniteScrollSwitch = (): React.ReactElement => {
  const [isInfiniteLoad, setInfiniteLoad] = useContext(InfiniteScrollContext);

  const infiniteScrollHandling = (event: React.FormEvent<HTMLButtonElement>) => {
    setInfiniteLoad(isInfiniteLoad === 'on' ? 'off' : 'on');
  };

  return (
    <Switch
      checked={isInfiniteLoad === 'on'}
      unCheckedChildren="🎇"
      checkedChildren="🧲"
      onClick={infiniteScrollHandling}
    />
  );
};

export default InfiniteScrollSwitch;
