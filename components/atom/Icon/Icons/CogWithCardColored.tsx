import { SVGProps } from 'react'

export default function CogWithCardColored({
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
        d="M221.155 440.889H85.333V71.111h284.445v124.871a33.704 33.704 0 0128.444 22.329v-147.2a28.446 28.446 0 00-28.444-28.445H85.333A28.445 28.445 0 0056.89 71.111v369.778a28.446 28.446 0 0028.444 28.444h158.72l-14.222-14.222a33.85 33.85 0 01-8.676-14.222z"
      />
      <path
        fill="#F6A54C"
        d="M477.013 333.796l-28.444-8.676a100.44 100.44 0 00-8.249-20.053l14.222-26.454a5.26 5.26 0 00-.995-6.257l-21.049-20.623a5.266 5.266 0 00-6.258-.995l-26.311 14.222a99.582 99.582 0 00-20.338-8.96l-8.676-28.444a5.261 5.261 0 00-5.12-3.556h-28.444a5.259 5.259 0 00-4.978 3.698l-8.675 28.444a99.533 99.533 0 00-20.48 8.676l-25.885-14.222a5.264 5.264 0 00-6.258.995l-20.906 20.48a5.264 5.264 0 00-.996 6.258l14.222 25.884a99.607 99.607 0 00-8.675 20.48l-28.445 8.676a5.266 5.266 0 00-3.697 4.978v28.444a5.264 5.264 0 003.697 4.978l28.445 8.675a99.577 99.577 0 008.675 20.054l-14.222 27.022a5.26 5.26 0 00.996 6.258l20.053 21.333a5.264 5.264 0 006.258.996l26.595-14.223a100.38 100.38 0 0019.769 8.107l8.676 28.445a5.259 5.259 0 004.978 3.697h28.444a5.262 5.262 0 004.978-3.697l8.676-28.445a99.517 99.517 0 0019.626-8.107l26.88 14.223a5.264 5.264 0 006.258-.996l20.622-20.622a5.26 5.26 0 00.996-6.258l-14.222-26.738a100.378 100.378 0 008.248-19.769l28.445-8.675a5.261 5.261 0 003.698-4.978v-29.155a5.265 5.265 0 00-2.134-5.12zm-125.724 67.128a47.357 47.357 0 01-46.928-56.335 47.357 47.357 0 0164.525-34.819 47.357 47.357 0 0129.336 43.794 47.358 47.358 0 01-46.933 47.36z"
      />
    </svg>
  )
}
