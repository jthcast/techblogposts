import React, { useContext, useEffect } from 'react';
import Switch from './../atoms/Switch';
import { ThemeContext } from '../../context/ThemeContext';
import { css } from '@emotion/css';
import globalCss from '../../styles/global-css';
import { IconMoonAndStarsColored, IconTemplate } from '../atoms/Icons';

interface DarkmodeSwitchProps {
  title?: string;
  ariaLabel?: string;
}

const DarkModeSwitch = ({ title, ariaLabel }: DarkmodeSwitchProps): React.ReactElement => {
  const [colorMode, setColorMode] = useContext(ThemeContext);

  const darkModeHandling = (event: React.FormEvent<HTMLButtonElement>) => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
    const innerItem = event.currentTarget.firstElementChild;
    innerItem.animate([
      { transform: 'rotate(0)' },
      { transform: 'rotate(-60deg)' },
      { transform: 'rotate(-15deg)' },
      { transform: 'rotate(0deg)' }
    ], 500);
  };

  useEffect(() => {
    if (colorMode) {
      document.documentElement.setAttribute('data-theme', colorMode);
    }
  }, [colorMode]);

  return (
    <Switch
      ariaLabel={ariaLabel}
      title={title}
      className={cssDarkModeSwitch}
      checked={colorMode === 'dark'}
      unCheckedChildren={<IconTemplate iconName="IconSun" className={cssIconSun}/>}
      checkedChildren={<IconMoonAndStarsColored />}
      onClick={darkModeHandling}
    />
  );
};

export default DarkModeSwitch;

const cssDarkModeSwitch = css`
  background-color: ${globalCss.color.borderColor};

  span {
    font-size: 2rem;
  }
`;

const cssIconSun = css`
  color: ${globalCss.color.primaryBrandColor};
`;

