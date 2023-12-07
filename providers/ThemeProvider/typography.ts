import { Noto_Sans_KR } from 'next/font/google'

export const notoSansKR = Noto_Sans_KR({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
})

const fontFamily = {
  notoSansKR: 'var(--font-noto-sans-kr)',
} as const

export const typography = {
  caption2: {
    regular: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 400,
      fontSize: '11px',
      lineHeight: '13px',
      letterSpacing: '0.07px',
    },
    bold: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 700,
      fontSize: '11px',
      lineHeight: '13px',
      letterSpacing: '0.06px',
    },
  },
  caption1: {
    regular: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '16px',
    },
    bold: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 700,
      fontSize: '12px',
      lineHeight: '16px',
    },
  },
  footnote: {
    regular: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 400,
      fontSize: '13px',
      lineHeight: '18px',
      letterSpacing: '-0.08px',
    },
    bold: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 700,
      fontSize: '13px',
      lineHeight: '18px',
      letterSpacing: '-0.08px',
    },
  },
  subHeadline: {
    regular: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '20px',
      letterSpacing: '-0.24px',
    },
    bold: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 700,
      fontSize: '15px',
      lineHeight: '20px',
      letterSpacing: '-0.5px',
    },
  },
  callout: {
    regular: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '21px',
      letterSpacing: '-0.32px',
    },
    bold: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '21px',
      letterSpacing: '-0.32px',
    },
  },
  body: {
    regular: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 400,
      fontSize: '17px',
      lineHeight: '22px',
      letterSpacing: '-0.41px',
    },
    bold: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 700,
      fontSize: '17px',
      lineHeight: '22px',
      letterSpacing: '-0.41px',
    },
  },
  headline: {
    regular: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 700,
      fontSize: '17px',
      lineHeight: '22px',
      letterSpacing: '-0.41px',
    },
    bold: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 700,
      fontSize: '17px',
      lineHeight: '22px',
      letterSpacing: '-0.41px',
    },
  },
  title3: {
    regular: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: '25px',
      letterSpacing: '0.38px',
    },
    bold: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '25px',
      letterSpacing: '0.38px',
    },
  },
  title2: {
    regular: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 400,
      fontSize: '22px',
      lineHeight: '28px',
      letterSpacing: '0.35px',
    },
    bold: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 700,
      fontSize: '22px',
      lineHeight: '28px',
      letterSpacing: '0.35px',
    },
  },
  title1: {
    regular: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 400,
      fontSize: '28px',
      lineHeight: '34px',
      letterSpacing: '0.36px',
    },
    bold: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 700,
      fontSize: '28px',
      lineHeight: '34px',
      letterSpacing: '0.36px',
    },
  },
  largeTitle: {
    regular: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 400,
      fontSize: '34px',
      lineHeight: '41px',
      letterSpacing: '0.37px',
    },
    bold: {
      fontFamily: fontFamily.notoSansKR,
      fontWeight: 700,
      fontSize: '34px',
      lineHeight: '41px',
      letterSpacing: '0.37px',
    },
  },
}
