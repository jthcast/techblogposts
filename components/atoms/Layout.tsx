import { useContext, useEffect } from 'react'
import unFocus from '../../customHooks/unFocus'
import Footer from '../organisms/Footer'
import Header from '../organisms/Header'
import config from '../../config'
import MenuList from '../organisms/MenuList'
import { LoginModalContext } from '../../context/LoginModalContext'
import LoginModal from '../molecules/LoginModal'

export default function Layout({ children }) {
  const [isLoginModalOpen, setLoginModalOpen] = useContext(LoginModalContext)

  const loginModalOpenHandling = () => {
    setLoginModalOpen(!isLoginModalOpen)
  }

  useEffect(() => {
    document.documentElement.removeAttribute('style')
    unFocus()
  }, [])

  return (
    <>
      <Header ghost showType="top" title={config.title} />
      <MenuList />
      <main>{children}</main>
      <LoginModal isOpen={isLoginModalOpen} openHandler={loginModalOpenHandling} />
      <Footer />
    </>
  )
}
