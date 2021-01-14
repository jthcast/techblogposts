import { css } from '@emotion/css';
import globalCss from '../../styles/global-css';
import React, { useState } from 'react';
import { IconTimes } from './Icons';

interface HeaderMessageProps {
  allowClose?: boolean;
  children?: React.ReactElement;
}

const HeaderMessage = ({
  allowClose = true,
  children,
}: HeaderMessageProps): React.ReactElement => {
  const [headerMessage, setHeaderMessageState] = useState(true);

  const closeHandling = () => {
    setHeaderMessageState(false);
  };

  return (
    <>
      {children && headerMessage && (
        <div className={cssHeaderMessage}>
          <div className={cssContainer}>
            <span className={cssContent}>{children}</span>
            {allowClose && (
              <button
                aria-label="close"
                onClick={closeHandling}
                className={cssButton}
              >
                <IconTimes />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderMessage;

const cssHeaderMessage = css`
  position: relative;
  width: 100%;
  background-color: ${globalCss.color.primaryBrandColor};
  padding: 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${globalCss.color.black};
  z-index: 2;
`

const cssContainer = css`
  max-width: ${globalCss.common.maxWidthHeader};
  display: flex;
  justify-content: center;
  align-items: center;
`

const cssContent = css`
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.1rem;
  padding: 0 5vw;
  text-align: center;

  a {
    color: ${globalCss.color.black};
    border-bottom: none;
    text-decoration: none;
    font-weight: ${globalCss.common.fontBold};
  }
`;

const cssButton = css`
  color: ${globalCss.color.black};
  background-color: transparent;
  position: absolute;
  right: 1.5rem;
  border: none;
  cursor: pointer;

  svg {
    vertical-align: middle;
  }
`;