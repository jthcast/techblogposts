import React from 'react';
import { useRecoilState } from 'recoil';
import { headerMessageState } from '../../recoilStates';
import Button from './Button';
import { IconTimes } from './Icons';

interface HeaderMessageProps {
  allowClose?: boolean;
  children?: React.ReactElement;
  className?: string;
}

const HeaderMessage = ({
  allowClose = true,
  children,
  className,
}: HeaderMessageProps): React.ReactElement => {
  const [headerMessage, setHeaderMessageState] = useRecoilState(
    headerMessageState
  );
  const closeHandling = () => {
    setHeaderMessageState(false);
  };

  return (
    <>
      {children && headerMessage && (
        <div className={`jth-headerMessage${className ? ` ${className}` : ``}`}>
          <div className="jth-headerMessage-container">
            <span className="jth-headerMessage-content">{children}</span>
            {allowClose && (
              <Button
                ariaLabel="close"
                lineType="none"
                onClick={closeHandling}
                className="jth-headerMessage-allowClose"
              >
                <IconTimes />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderMessage;
