import { useEffect } from "react";
import unFocus from "../../customHooks/unFocus";
import SEO from "./Seo";

interface layoutProps {
  title?: string;
  description?: string;
  children?: any;
  image?: string;
  author?: string;
  publishDate?: string;
}

export default function Layout({ title, description = '', children, image, author, publishDate }: layoutProps) {
  useEffect(() => {
    document.documentElement.removeAttribute('style');
    unFocus();
  }, []);

  return (
    <>
      <SEO title={title} description={description} image={image} author={author} publishDate={publishDate} />
      {/* <Header ghost showType="top" title={t('Common.title')} /> */}
      {/* <MenuList /> */}
      {/* <MDXProvider components={shortcodes}> */}
      <main>{children}</main>
      {/* </MDXProvider> */}
      {/* <Footer /> */}
    </>
  )
}