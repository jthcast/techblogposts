import React, { useContext, useEffect, useRef } from 'react';
import { css } from '@emotion/css';
import globalCss from '../../styles/global-css';
import Modal from '../atoms/Modal';
import { IconLogoColored, IconGoogleColored, IconTemplate } from '../atoms/Icons';
import config from '../../config';
import firebase from 'firebase/app';
import { LoginContext } from '../../context/LoginContext';
import { useRouter } from 'next/router';

interface LoginModalProps {
  isOpen: boolean;
  openHandler: () => void;
}

const LoginModal = ({ isOpen, openHandler }: LoginModalProps): React.ReactElement => {
  const [loginInfo, setLoginInfo] = useContext(LoginContext);
  const firstEl = useRef<HTMLButtonElement>();
  const lastEl = useRef<HTMLButtonElement>();
  const router = useRouter();

  const keyDownHandling = (event: KeyboardEvent) => {
    const firstElement = firstEl.current;
    const lastElement = lastEl.current;
    if (
      isOpen &&
      event.code === 'Tab' &&
      event.target !== firstElement &&
      event.target !== lastElement &&
      !event.shiftKey
    ) {
      event.preventDefault();
      firstElement.focus();
    }
    if (
      isOpen &&
      event.code === 'Tab' &&
      event.target === lastElement &&
      !event.shiftKey
    ) {
      event.preventDefault();
      firstElement.focus();
    }
    if (
      isOpen &&
      event.code === 'Tab' &&
      event.target === firstElement &&
      event.shiftKey
    ) {
      event.preventDefault();
      lastElement.focus();
    }
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', keyDownHandling);
      window.addEventListener('popstate', openHandling);
      router.push('?login', undefined, { shallow: true });
    }

    return () => {
      window.removeEventListener('keydown', keyDownHandling);
      window.removeEventListener('popstate', openHandling);
    };
  }, [isOpen]);

  const openHandling = () => {
    if(openHandler){
      openHandler();
    }
    router.push('', undefined, { shallow: true });
  }

  const loginErrorHandling = (error: any) => {
    const { code } = error;
    if(code === 'auth/user-disabled'){
      alert('이용이 정지된 계정입니다.');
    }
    if(code === 'auth/account-exists-with-different-credential'){
      alert('같은 이메일로 등록된 계정이 이미 존재합니다.');
    }
  };

  const makeProvider = (providerId: string) => {
    if(providerId === 'google.com'){
      return new firebase.auth.GoogleAuthProvider();
    }else if(providerId === 'github.com'){
      return new firebase.auth.GithubAuthProvider();
    }
  }

  const loginHandling = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const providerId = event.currentTarget.getAttribute('data-providerid');
    const provider = makeProvider(providerId);
    firebase.auth().signInWithPopup(provider).then((result) => {
      openHandling();
      setLoginInfo(true);
    }).catch((error) => {
      loginErrorHandling(error);
    });
  };

  return (
    <>
      {!loginInfo && 
        <Modal isOpen={isOpen} openHandler={openHandling}>
          <div className={cssFormWrapper}>
            <IconLogoColored className={cssLogo} />
            <p>{config.title}</p>
            <button className={cssGoogleLoginButton} ref={firstEl} onClick={loginHandling} data-providerid='google.com'>
              <IconGoogleColored className={cssIcon}/>
              <span>Google 로그인</span>
            </button>
            <button className={cssGithubLoginButton} ref={lastEl} onClick={loginHandling} data-providerid='github.com'>
              <IconTemplate iconName="IconGithubCircle" className={cssIcon}/>
              <span>Github 로그인</span>
            </button>
          </div>
        </Modal>
      }
    </>
  );
};

export default LoginModal;

const cssFormWrapper = css`
  justify-content: center;
  align-items: center;
  width: 20rem;
  max-width: 85vw;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  border-radius: 0.25rem;
  margin: auto;

  p{
    text-align: center;
  }
`;

const cssLogo = css`
  width: 100%;
  font-size: 3rem;
`;

const cssLabel = css`
  display: grid;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: ${globalCss.color.colorDown};
`;

const cssInput = css`
  background-color: transparent;
  border: 0.1rem solid ${globalCss.color.color};
  border-radius: 0.3rem;
  padding: 0.25rem;
  color: ${globalCss.color.color};
`;

const cssGoogleLoginButton = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  border: none;
  border-radius: 0.3rem;
  padding: 0.3rem 0;
  background-color: #4285f4;
  color: ${globalCss.color.white};
`;

const cssGithubLoginButton = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  border: none;
  border-radius: 0.3rem;
  padding: 0.3rem 0;
  background-color: ${globalCss.color.color};
  color: ${globalCss.color.backgroundColor};

  svg {
    position: relative;
    left: -0.1rem;
    font-size: 1.11rem;
  }
`;

const cssIcon = css`
  margin-right: 0.5rem;
`;