const breakpoints = {
  mobile: 600,
  tablet: 768,
  laptop: 992,
  desktop: 1200,
}

export const getMediaQuery = (breakpoint: keyof typeof breakpoints) =>
  `(min-width: ${breakpoints[breakpoint]}px)`
