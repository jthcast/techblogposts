import { SVGProps } from 'react'

export default function PaperWithLinesColored({
  ...props
}: SVGProps<SVGSVGElement>) {
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
        fill="#614CF6"
        d="M67 57c0-13.807 11.193-25 25-25h329c13.807 0 25 11.193 25 25v398c0 13.807-11.193 25-25 25H92c-13.807 0-25-11.193-25-25V57zm341.315 44.154c0-13.807-11.193-25-25-25h-253.63c-13.807 0-25 11.193-25 25v308.909c0 13.807 11.193 25 25 25h253.63c13.807 0 25-11.193 25-25V101.154z"
      />
      <path
        fill="#F6A54C"
        d="M128 154c0-5.523 4.477-10 10-10h76c5.523 0 10 4.477 10 10v12c0 5.523-4.477 10-10 10h-76c-5.523 0-10-4.477-10-10v-12zM257 154c0-5.523 4.477-10 10-10h107c5.523 0 10 4.477 10 10v12c0 5.523-4.477 10-10 10H267c-5.523 0-10-4.477-10-10v-12zM128 282c0-5.523 4.477-10 10-10h107c5.523 0 10 4.477 10 10v12c0 5.523-4.477 10-10 10H138c-5.523 0-10-4.477-10-10v-12zM128 218c0-5.523 4.477-10 10-10h236c5.523 0 10 4.477 10 10v12c0 5.523-4.477 10-10 10H138c-5.523 0-10-4.477-10-10v-12zM128 346c0-5.523 4.477-10 10-10h236c5.523 0 10 4.477 10 10v12c0 5.523-4.477 10-10 10H138c-5.523 0-10-4.477-10-10v-12zM286 282c0-5.523 4.477-10 10-10h78c5.523 0 10 4.477 10 10v12c0 5.523-4.477 10-10 10h-78c-5.523 0-10-4.477-10-10v-12z"
      />
    </svg>
  )
}
