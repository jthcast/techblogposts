import { css } from '@emotion/css'
import globalCss, { rem } from '../styles/global-css'
import useScrollToTop from '../customHooks/useScrollToTop'
import SEO from '../components/atoms/Seo'

export default function Privacy() {
  useScrollToTop()

  return (
    <>
      <SEO title={'개인정보처리방침'} />
      <section className={cssContainer}>
        <h1>Techblogposts 개인정보처리방침</h1>
        <h2>1. 개인정보처리방침이란?</h2>
        <p>
          Techblogposts는 이용자의 ‘동의를 기반으로 개인정보를 수집·이용 및 제공’하고 있으며, ‘이용자의 권리 (개인정보 자기결정권)를
          적극적으로 보장’합니다.
        </p>
        <p>
          Techblogposts는 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하고 있습니다.
        </p>
        <p>
          '개인정보 처리방침'이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 Techblogposts가
          준수해야 할 지침을 의미합니다.
        </p>
        <p>본 개인정보 처리방침은 Techblogposts에 적용됩니다.</p>
        <h2>2. 개인정보 수집</h2>
        <p>서비스 제공을 위한 필요 최소한의 개인정보를 수집하고 있습니다.</p>
        <p>
          모든 이용자는 Techblogposts가 제공하는 서비스를 이용할 수 있고, 회원가입을 통해 더욱 다양한 서비스를 제공받을 수 있습니다.
          이용자의 개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 사실을 알리고 동의를 구하도록 하겠습니다.
        </p>
        <p>수집하는 개인정보는 다음과 같습니다.</p>
        <p>
          회원 가입 및 서비스 이용 과정에서 아래와 같은 최소한의 개인정보를 수집하고 있으며, 이용자의 동의없이 민감정보를 수집하지 않습니다.
        </p>
        <ul>
          <li>필수정보란? : 해당 서비스의 본질적 기능을 수행하기 위한 정보</li>
          <li>
            선택정보란? : 보다 특화된 서비스를 제공하기 위해 추가 수집하는 정보 (선택 정보를 입력하지 않은 경우에도 서비스 이용 제한은
            없습니다.)
          </li>
          <li>민감정보란? : 이용자의 사생활을 침해할 우려가 있는 정보 (인종, 사상 및 신조, 정치적 성향이나 범죄기록, 의료정보 등)</li>
        </ul>
        <h3>[회원가입시]</h3>
        <p>필수: 이메일주소</p>
        <h3>개인정보를 수집하는 방법은 다음과 같습니다.</h3>
        <p>
          개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 사실을 알리고 동의를 구하고 있으며, 아래와 같은 방법을 통해 개인정보를
          수집합니다.
        </p>
        <ul>
          <li>회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우</li>
          <li>제휴 서비스 또는 단체 등으로부터 개인정보를 제공받은 경우</li>
        </ul>
        <h3>서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.</h3>
        <p>
          PC웹, 모바일 웹/앱 이용 과정에서 단말기정보(OS, 화면사이즈, 디바이스 아이디), IP주소, 쿠키, 방문일시, 서비스 이용 기록 등의 정보가
          자동으로 생성되어 수집될 수 있습니다.
        </p>
        <h2>3. 개인정보 이용</h2>
        <p>회원관리, 서비스 제공·개선, 신규 서비스 개발 등을 위해 이용합니다.</p>
        <p>
          회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 아래와 같이 서비스 제공을 위해
          필요한 최소한의 개인정보를 수집하고 있습니다.
        </p>
        <ul>
          <li>회원 식별/가입의사 확인, 본인 확인, 부정이용 방지</li>
          <li>인구통계학적 특성에 따른 분석 및 개인화 서비스 제공</li>
          <li>신규 서비스 개발, 다양한 서비스 제공, 문의사항 또는 불만처리, 공지사항 전달</li>
          <li>서비스의 원활한 운영에 지장을 주는 행위(계정 도용 및 부정 이용 행위 등 포함)에 대한 방지 및 제재</li>
          <li>서비스 이용 기록, 접속 빈도 및 서비스 이용에 대한 통계, 맞춤형 서비스 제공, 서비스 개선에 활용</li>
        </ul>
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
