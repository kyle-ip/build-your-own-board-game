type Props = { className?: string }

export function BrandMark({ className = 'h-10 w-10' }: Props) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}brand/logo.svg`}
      alt=""
      className={`rounded-2xl shadow-[0_10px_24px_rgb(15_36_48_/0.25)] ${className}`}
    />
  )
}
