import { SVGProps } from 'react'

export default function Logo({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="currentColor"
      viewBox="0 0 512 512"
      data-icon
      {...props}
    >
      <path fill="#F6A54C" d="M32 96V32h96v64H32zM384 96V32h96v64h-96z" />
      <path
        fill="#614CF6"
        d="M32 279V130h95.893v154c0 55.228 44.772 100 100 100h56.713c55.229 0 100-44.772 100-100V130H480v149c0 110.457-89.543 200-200 200h-48c-110.457 0-200-89.543-200-200z"
      />
    </svg>
  )
}
