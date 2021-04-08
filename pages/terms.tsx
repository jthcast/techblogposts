import Layout from '../components/atoms/Layout';
import { css } from '@emotion/css';
import globalCss, { rem } from '../styles/global-css';
import useScrollToTop from '../customHooks/useScrollToTop';

export default function Terms() {
  useScrollToTop();

  return (
    <Layout title={'약관'}>
      <section className={cssContainer}>
          <h1>Techblogposts 약관</h1>
          <h2>Techblogposts 소개</h2>
          <p>
            Techblogposts는 여러 기술 블로그들의 포스트들을 한곳에서 모아 보여주는 서비스를 제공하는 사이트입니다.
          </p>
          <p>
            제공되는 모든 포스트들은 RSS를 제공하는 블로그에서 수집하고 있으며, 해당하는 포스트들의 저작권은 Techblogposts가 아닌 해당 블로그를 소유한 곳에 있습니다.
          </p>
          <h2>회원으로 가입하시면 추가적인 서비스를 이용하실 수 있습니다.</h2>
          <p>
            포스트들과 블로그들의 목록은 회원가입 없이도 조회하실 수 있습니다.
          </p>
          <p>
            회원으로 등록하신다면 즐겨찾기와 같은 추가적인 서비스를 이용하실 수 있습니다.
          </p>
          <h2>최소한의 개인 정보만을 요구하며, 해당 정보를 소중히 다룹니다.</h2>
          <p>
            가입 시 이메일 주소를 필수 항목으로 요구하고 있으며, 이는 각 회원을 식별하기 위한 최소한의 정보입니다. 이메일 주소 이외에 추가적인 정보는 로그인 인증을 제공하는 업체에서 제공하는 최소한의 정보만을 저장합니다.
          </p>
          <p>
            여러분은 원하실 때 회원을 탈퇴하실 수 있습니다.
          </p>
          <h2>부득이 서비스 이용을 제한할 경우 합리적인 절차를 준수합니다.</h2>
          <p>
            악의적으로 서비스를 방해하는 경우, 타 사용자의 자유를 심각하게 침해하는 경우와 같이 약관 및 운영 정책을 위반하시는 경우에 서비스 이용을 일부 또는 전부 제한할 수 있습니다.
          </p>
          <h2>여러분의 소중한 의견에 귀 기울이겠습니다.</h2>
          <p>
            언제든지 이메일 또는 마련된 소통 창구를 통해 서비스에 관련된 의견이나 개선사항을 전달하실 수 있으며, 처리 과정 및 결과를 전달할 수 있도록 노력하겠습니다.
          </p>
      </section>
    </Layout>
  );
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
`;