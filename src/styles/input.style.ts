import clsx from 'clsx'

const sharedInputClass = clsx(
  'max-w-[6ch], min-w-[4ch]',
  'px-2 py-1 rounded',
  'bg-indigo-900 text-pink-100',
  'focus:outline-none focus:ring focus:ring-blue-400',
  'text-center'
)

export const sharedInputProps = {
  type: 'number',
  min: 1,
  max: 250,
  className: sharedInputClass,
}

const sharedInputLabelClass = clsx(
  'text-pink-100',
  'text-lg',
  'font-medium',
  'text-center',
  'content-center'
)

export const sharedInputLabelProps = {
  className: sharedInputLabelClass,
}
