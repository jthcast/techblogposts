import React, { useEffect } from 'react';
import Switch from '../atoms/Switch';
import { useRecoilState } from 'recoil';
import { initialColorMode } from '../../recoilStates';

const InfiniteScrollSwitch = (): React.ReactElement => {
  // const [colorMode, setColorMode] = useRecoilState(initialColorMode);

  // const darkModeHandling = () => {
  //   setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  // };

  // useEffect(() => {
  //   document.body.setAttribute('data-theme', colorMode);
  //   window.localStorage.setItem('color-mode', colorMode);
  // }, [colorMode]);

  // useEffect(() => {
  //   checkSystemPreference();
  //   systemPreference.addEventListener('change', checkSystemPreference);

  //   return () => {
  //     systemPreference.removeEventListener('change', checkSystemPreference);
  //   };
  // }, [checkSystemPreference, systemPreference]);

  return (
    <Switch
      className="switch-darkMode"
      // checked={colorMode === 'dark'}
      unCheckedChildren="🎇"
      checkedChildren="🧲"
    // onClick={darkModeHandling}
    />
  );
};

export default InfiniteScrollSwitch;
