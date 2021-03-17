import { injectGlobal } from '@emotion/css';
import globalCss from './global-css';

injectGlobal`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=block');

html {
  font-size: ${globalCss.common.fontPercent};
  height: 100%;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}

body {
  height: 100%;
  line-height: 1.8;
}

#__next {
  display: flex;
  flex-direction: column;
  flex: 1 auto;
  overflow-x: hidden;
  overflow-y: overlay;
  height: 100%;
  width: 100%;
}

:root {
  --background-base: #ffffff;
  --background-base-opacity: rgba(255, 255, 255, 0.85);
  --background-down-opacity: rgba(255, 255, 255, 0.2);
  --scrollbar-base-opacity: rgba(0, 0, 0, 0.5);
  --background-code-base: #f9f2f4;
  --color-base: #000000;
  --color-down: #70757a;
  --color-code-base: #9a354a;
  --primary-brand-base: #f6a54c;
  --secondary-brand-base: #614cf6;
  --secondary-brand-base-opacity: rgba(110, 89, 255, 0.4);
  --primary-brand-background-base: #504646;
  --border-base: #d6d6d6;
  --group-base: #f4f4f4;
  --group-base-opacity: rgba(244, 244, 244, 0.5);
  --danger: #e03434;
  --black: #000000;
  --white: #ffffff;
  color-scheme: light dark;

  background-color: var(--background-base);
  color: var(--color-base);
}

[data-theme='dark'] {
  --background-base: #000000;
  --background-base-opacity: rgba(0, 0, 0, 0.85);
  --background-down-opacity: rgba(0, 0, 0, 0.2);
  --scrollbar-base-opacity: rgba(255, 255, 255, 0.5);
  --background-code-base: #3c3636;
  --color-base: #ffffff;
  --color-down: #ababab;
  --color-code-base: #ffb3c2;
  --secondary-brand-base: #6e59ff;
  --secondary-brand-base-opacity: rgba(110, 89, 255, 0.4);
  --border-base: #d6d6d6;
  --group-base: #242526;
  --group-base-opacity: rgba(36, 37, 38, 0.7);

  background-color: var(--background-base);
  color: var(--color-base);
}

@media (hover: hover) and (pointer: fine) { /*notTouchDevice*/
  * {
    &::-webkit-scrollbar {
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--scrollbar-base-opacity);
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0);
    }
  }
}
`;
