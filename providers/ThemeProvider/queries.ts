const breakpoints = {
  mobile: '17.5rem',
  tablet: '40.875rem',
  desktop: '64rem',
}

export const mediaQuery: { [key in keyof typeof breakpoints]: string } = {
  mobile: `(max-width: ${breakpoints['mobile']})`,
  tablet: `(min-width: ${breakpoints['tablet']}) and (max-width: ${breakpoints['desktop']})`,
  desktop: `(min-width: ${breakpoints['desktop']})`,
}
