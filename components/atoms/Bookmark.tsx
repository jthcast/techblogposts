import { css, cx, keyframes } from '@emotion/css';
import globalCss from '../../styles/global-css';
import React, { useContext, useEffect, useState } from 'react';
import { IconTemplate } from './Icons';
import { LoginContext } from '../../context/LoginContext';
import { LoginModalContext } from '../../context/LoginModalContext';
import { API } from '../../lib/utils/api';
import { BookmarkContext } from '../../context/BookmarkContext';

interface BookmarkProps {
  spin?: boolean;
  className?: string;
  count?: number;
  parent?: string;
}

export const bookmarksStorageName = 'bookmarks';

const Bookmark = ({
  spin,
  className,
  count,
  parent
}: BookmarkProps): React.ReactElement => {
  const [isBookmarked, setBookmark] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(count);
  const [loginInfo, setLoginInfo] = useContext(LoginContext);
  const [bookmarks, setBookmarks] = useContext(BookmarkContext);
  const [isLoginModalOpen, setLoginModalOpen] = useContext(LoginModalContext);
  
  const addBookmark = async () => {
    const body = {
      uid: loginInfo.uid,
      parent
    };
    const fetchData = await fetch(`/api/bookmark`, {
      method: 'POST',
      body: JSON.stringify(body)
    });
    const result: API = await fetchData.json();
    const { isError, statusCode, message, data } = result;
    if(isError){
      console.error(message);
      return;
    }
    setBookmarks([...bookmarks, parent]);
    setBookmark(true);
  };

  const removeBookmark = async () => {
    const id = encodeURI(`${loginInfo.uid}-${parent}`);
    const fetchData = await fetch(`/api/bookmark?id=${id}`, {
      method: 'DELETE',
    });
    const result: API = await fetchData.json();
    const { isError, statusCode, message, data } = result;
    if(isError){
      console.error(message);
      return;
    }
    const filteredBookmarks = bookmarks.filter((bookmark) => bookmark !== parent);
    setBookmarks(filteredBookmarks);
    setBookmark(false);
  };
  
  const bookmarkHandling = () => {
    if(loginInfo && !isBookmarked){
      addBookmark();
    }else if(loginInfo && isBookmarked){
      removeBookmark();
    }else if(!loginInfo){
      setLoginModalOpen(!isLoginModalOpen);
    }
  };

  const checkBookmarked = () => {
    if(!loginInfo){
      setBookmark(false);
      return;
    }
    if(!bookmarks){
      setBookmark(false);
      return;
    }
    if(bookmarks.includes(parent)){
      setBookmark(true);
    }else{
      setBookmark(false);
    }
  };

  useEffect(() => {
    checkBookmarked();
  }, [bookmarks]);

  useEffect(() => {
    checkBookmarked();
  }, []);

  return (
    <button 
      className={cssButton}
      title='즐겨찾기'
      onClick={bookmarkHandling}
    >
      <IconTemplate iconName={isBookmarked ? 'IconStarFilled' : 'IconStar'} 
        className={cx({
          [cssBookmark]: true,
          [cssBookmarked]: isBookmarked,
          [cssBookMarkCancel]: !isBookmarked,
        })}
      />
      {bookmarkCount && <span>{bookmarkCount}</span>}
    </button>
  );
};

export default Bookmark;

const cssButton = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: none;
  background: none;
  color: ${globalCss.color.colorDown};
  cursor: pointer;
  height: 100%;
`;

const cssBookmark = css`
  height: 100%;
  margin-right: 0.25rem;
  margin-top: 0.1rem;
`;

const animationKeyframes = keyframes`
  0%{
    transform: scale(.2);
  }
  40%{
    transform: scale(1.2);
  }
  100%{
    transform: scale(1);
  }
}
`;

const animationOutKeyframes = keyframes`
  0%{
    transform: scale(1.4);
  }
  100%{
    transform: scale(1);
  }
}
`;

const cssBookmarked = css`
  color: ${globalCss.color.secondaryBrandColor};
  animation: ${animationKeyframes} 0.3s linear;
`;

const cssBookMarkCancel = css`
  animation: ${animationOutKeyframes} 0.3s linear;
`;
