import { useContext, useEffect } from "react";
import unFocus from "../../customHooks/unFocus";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import SEO from "./Seo";
import config from '../../config'
import MenuList from "../organisms/MenuList";
import { LoginModalContext } from "../../context/LoginModalContext";
import LoginModal from "../molecules/LoginModal";

interface layoutProps {
  title?: string;
  description?: string;
  children?: any;
  image?: string;
  author?: string;
  publishDate?: string;
}

export default function Layout({ title, description = '', children, image, author, publishDate }: layoutProps) {
  const [isLoginModalOpen, setLoginModalOpen] = useContext(LoginModalContext);

  const loginModalOpenHandling = () => {
    setLoginModalOpen(!isLoginModalOpen);
  }

  useEffect(() => {
    document.documentElement.removeAttribute('style');
    unFocus();
  }, []);

  return (
    <>
      <SEO title={title} description={description} image={image} author={author} publishDate={publishDate} />
      <Header ghost showType="top" title={config.title} />
      <MenuList />
      <main>{children}</main>
      <LoginModal isOpen={isLoginModalOpen} openHandler={loginModalOpenHandling} />
      <Footer />
    </>
  )
}
