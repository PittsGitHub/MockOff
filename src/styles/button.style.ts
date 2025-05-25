import clsx from 'clsx'

export const sharedButtonBaseClass = clsx(
  'flex-1 px-4 py-2',
  'rounded-lg font-semibold',
  'transition-all duration-600'
)

export const buttonVariantCopied = clsx(
  'bg-transparent text-pink-100',
  'ring-opacity-50 backdrop-blur-md backdrop-saturate-150',
  'shadow-md'
)

export const buttonVariantDefault = clsx(
  'bg-white hover:bg-pink-300 text-indigo-800',
  'shadow cursor-pointer'
)

export const buttonVariantDisabled = clsx(
  'text-pink-300 font-normal line-through bg-purple-950',
  'cursor-not-allowed'
)
