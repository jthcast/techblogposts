import { css } from '@emotion/css'
import globalCss, { rem } from '../styles/global-css'
import useScrollToTop from '../customHooks/useScrollToTop'
import { LoginContext } from '../context/LoginContext'
import { useContext, useEffect, useState } from 'react'
import ErrorSection from '../components/atoms/ErrorSection'
import Button from '../components/atoms/Button'
import Icon from '../components/atoms/Icon'
import firebase from 'firebase/app'
import { API } from '../lib/utils/api'
import { BookmarkContext } from '../context/BookmarkContext'
import { useRouter } from 'next/router'
import SEO from '../components/atoms/Seo'

export default function Mypage() {
  const [isLoading, setLoading] = useState(true)
  const [isDeleteLoading, setDeleteLoading] = useState(false)
  const [error, setError] = useState<[number, string]>(undefined)
  const [loginInfo, setLogin] = useContext(LoginContext)
  const [email, setEmail] = useState<string>(undefined)
  const [createdTime, setCreatedTime] = useState<string>(undefined)
  const [providerId, setProviderId] = useState<string>(undefined)
  const [bookmarks, setBookmarks] = useContext(BookmarkContext)
  const router = useRouter()
  useScrollToTop()

  const getAccountInfo = () => {
    setLoading(true)
    setError(undefined)
    if (!loginInfo) {
      setError([500, '유저 정보가 없습니다.'])
      setLoading(false)
    }
    const { creationTime, email, providerId } = loginInfo
    const creationTimeInfo = new Date(creationTime)
    const createdYear = creationTimeInfo.getFullYear()
    const createdMonth = creationTimeInfo.getMonth() + 1
    const createdDate = creationTimeInfo.getDate()
    const createdHours = creationTimeInfo.getHours()
    const createdMinutes = creationTimeInfo.getMinutes()
    const createdSeconds = creationTimeInfo.getSeconds()
    const createdTime = `${createdYear}-${createdMonth}-${createdDate} ${createdHours}:${createdMinutes}:${createdSeconds}`
    setCreatedTime(createdTime)
    setEmail(email)
    const provider = providerId.split('.')[0]
    const providerName = `${provider[0].toUpperCase()}${provider.slice(1, provider.length)}`
    setProviderId(providerName)
    setLoading(false)
  }

  useEffect(() => {
    if (!loginInfo) {
      setLoading(false)
      return
    }
    getAccountInfo()
  }, [loginInfo])

  const getBookmarks = async () => {
    const fetchData = await fetch(`/api/bookmark?uid=${loginInfo.uid}&getType=children`, {
      method: 'GET',
    })
    const result: API = await fetchData.json()
    const { isError, statusCode, message, data } = result
    if (isError) {
      setError([statusCode, message])
      return
    }
    const bookmarks = data.reduce((acc, bookmark) => {
      acc.push(bookmark._id)
      return acc
    }, [])

    return bookmarks
  }

  const deleteBookmarks = async (id: string) => {
    const fetchData = await fetch(`/api/bookmark?id=${encodeURI(id)}`, {
      method: 'DELETE',
    })
    const result: API = await fetchData.json()
    const { isError, statusCode, message, data } = result
    if (isError) {
      setError([statusCode, message])
      return
    }
  }

  const deleteAccount = async () => {
    const removeStates = () => {
      setBookmarks(null)
      setLogin(false)
      setDeleteLoading(false)
      unsubscribe()
      alert('탈퇴되었습니다.')
      router.push('/')
    }

    const errorHandling = (error: any) => {
      const { code } = error
      if (code === 'auth/popup-closed-by-user') {
        alert('인증 팝업을 취소하셨습니다.')
      }
      setDeleteLoading(false)
      unsubscribe()
    }

    const makeProvider = () => {
      const { providerId } = loginInfo
      if (providerId === 'google.com') {
        return new firebase.auth.GoogleAuthProvider()
      } else if (providerId === 'github.com') {
        return new firebase.auth.GithubAuthProvider()
      }
    }

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .delete()
          .then(() => {
            removeStates()
          })
          .catch((error) => {
            if (error.code === 'auth/requires-recent-login') {
              const provider = makeProvider()
              user
                .reauthenticateWithPopup(provider)
                .then((credential) => {
                  user
                    .delete()
                    .then(() => {
                      removeStates()
                    })
                    .catch((error) => {
                      errorHandling(error)
                    })
                })
                .catch((error) => {
                  errorHandling(error)
                })
              return
            }
            errorHandling(error)
          })
      }
    })
  }

  const deleteHandling = async () => {
    setDeleteLoading(true)
    setError(undefined)
    const bookmarks = await getBookmarks()
    for (let id of bookmarks) {
      await deleteBookmarks(id)
    }
    setBookmarks(null)
    deleteAccount()
  }

  return (
    <>
      <SEO title={'계정 설정'} />
      <section className={cssContainer}>
        {isLoading && (
          <div className={cssLoading}>
            <Icon iconName="spinner" isSpin />
          </div>
        )}
        {!loginInfo && !isLoading && <h1 className={cssTitle}>로그인이 필요합니다 😅</h1>}
        {loginInfo && !isLoading && !error && (
          <>
            <h2>이메일</h2>
            <p>{email}</p>
            <p>{providerId}에서 로그인되었습니다.</p>
            <h2>계정</h2>
            <p>{createdTime}에 가입하셨습니다.</p>
            <Button className={cssDeleteButton} onClick={deleteHandling} loading={isDeleteLoading}>
              계정 탈퇴
            </Button>
          </>
        )}
        {error && (
          <ErrorSection message={error[1]} statusCode={error[0]}>
            <Button ariaLabel="Retry" onClick={getAccountInfo}>
              <Icon iconName="redo" />
            </Button>
          </ErrorSection>
        )}
      </section>
    </>
  )
}

const cssContainer = css`
  max-width: ${globalCss.common.maxWidth};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5rem;
  margin: auto;
  margin-top: 1rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    margin-top: 0;
    padding: 0 1.25rem;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    padding: 0 3rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: ${rem(32)} 0 ${rem(16)} 0;
  }

  p {
    margin: ${rem(16)} 0;
  }

  ul {
    padding-left: ${rem(26)};
  }
`

const cssLoading = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  color: ${globalCss.color.secondaryBrandColor};
  margin: 5rem 0;
`

const cssTitle = css`
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 5rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    margin-bottom: 1rem;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    margin-bottom: 3rem 0;
  }
`

const cssDeleteButton = css`
  border: none;
  color: ${globalCss.color.danger};
  width: fit-content;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
`
