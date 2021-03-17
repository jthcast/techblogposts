import { css, keyframes } from '@emotion/css';
import globalCss, { rem } from '../../styles/global-css';
import { IconEnvelope } from './Icons';
import config from '../../config';

interface ErrorProps {
  children?: React.ReactElement;
  errorMessage?: string;
}

const ErrorSection = ({
  children,
  errorMessage
}: ErrorProps): React.ReactElement => {
  return (
    <section className={cssSection}>
      <div className={cssContainer}>
        <h1 data-content='오류가 발생했습니다'>
          오류가 발생했습니다. 💥
        </h1>
        {errorMessage ?
          <>
            <p>죄송합니다 😥</p>
            <p>{errorMessage}</p>
          </> :
          <>
            <p>죄송합니다 😥 오류를 제보 부탁드립니다.</p>
            <a className={cssIcon} href={`mailto:${config.author.email}`} aria-label="mail">
              <IconEnvelope />
            </a>
          </>
        }
        {children}
      </div>
    </section>
  );
};

export default ErrorSection;

const cssSection = css`
  width: 100%;
  padding: 5rem 0;
`;

const cssContainer = css`
  max-width: ${globalCss.common.maxWidth};
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  align-items: center;
  justify-items: center;
  max-width: 66.667rem;
  width: 100%;
  padding: 0 5rem;
  margin: auto;
  color: ${globalCss.color.color};

  @media ${globalCss.breakpoint.mobileQuery} {
    padding: 0 1.25rem;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    padding: 0 3rem;
  }
`;

const keyFramesBounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, ${rem(-7)}, 0);
  }

  70% {
    transform: translate3d(0, ${rem(-3)}, 0);
  }

  90% {
    transform: translate3d(0,-${rem(-1)},0);
  }
`;

const cssBounce = css`
  margin-left: 0.25rem;
  margin-top: 0.1rem;
  animation: ${keyFramesBounce} 1s ease infinite;
`;

const cssIcon = css`
  font-size: 2rem;
  color: ${globalCss.color.color};

  @media ${globalCss.breakpoint.mobileQuery} {
    font-size: 2rem;
  }
`;