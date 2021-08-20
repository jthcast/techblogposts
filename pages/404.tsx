import Link from 'next/link'
import { css } from '@emotion/css'
import globalCss, { rem } from '../styles/global-css'
import SEO from '../components/atoms/Seo'

export default function NotFoundPage() {
  return (
    <>
      <SEO title={'404'} />
      <section className={cssNotFoundPage}>
        <div className={cssContainer}>
          <h1 data-content="404">404</h1>
          <p>죄송합니다 😥 해당 페이지가 더는 존재하지 않거나 옮겨진 것 같습니다.</p>
          <Link href="/">시작 페이지로 가기</Link>
        </div>
      </section>
    </>
  )
}

const cssNotFoundPage = css`
  width: 100%;
  padding: 5rem 0;
`

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

  a {
    color: ${globalCss.color.color};
    font-weight: ${globalCss.common.fontBold};
    border-bottom: ${rem(2)} solid ${globalCss.color.secondaryBrandColor};
    text-decoration: none;
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    padding: 0 1.25rem;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    padding: 0 3rem;
  }
`
