import { SVGProps } from 'react'

export default function GoogleColored({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="currentColor"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="#FFFFFF"
        d="M0,256a256,256 0 1,0 512,0a256,256 0 1,0 -512,0z"
      />
      <path
        fill="#EA4335"
        d="M132.493 214.28c8.929-26.424 26.16-49.414 49.237-65.692 23.077-16.277 50.819-25.011 79.27-24.953 32.251 0 61.41 11.2 84.31 29.53L411.949 88C371.34 53.373 319.3 32 261 32 170.736 32 93.029 82.363 55.663 156.133l76.83 58.147z"
      />
      <path
        fill="#34A853"
        d="M338.097 368.243c-20.801 13.123-47.212 20.123-77.097 20.123-28.337.057-55.975-8.607-79-24.764-23.026-16.158-40.272-38.99-49.297-65.266l-77.097 57.251c18.916 37.451 48.191 68.962 84.498 90.954C176.411 468.534 218.295 480.126 261 480c55.971 0 109.443-19.469 149.499-56l-72.383-55.757h-.019z"
      />
      <path
        fill="#4A90E2"
        d="M410.499 424c41.888-38.229 69.081-95.125 69.081-168 0-13.253-2.08-27.496-5.19-40.73H261v86.557h122.82c-6.049 29.101-22.327 51.632-45.704 66.416L410.499 424z"
      />
      <path
        fill="#FBBC05"
        d="M132.702 298.336A130.275 130.275 0 01125.68 256c0-14.597 2.385-28.616 6.813-41.72l-76.83-58.146C39.946 187.171 31.843 221.365 32 256c0 35.84 8.492 69.627 23.606 99.587l77.096-57.251z"
      />
    </svg>
  )
}
