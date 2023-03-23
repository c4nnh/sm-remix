import { Link } from '@remix-run/react'
import { cx } from 'class-variance-authority'

type Props = {
  name: string
  description: string
  image: string
  link: string
  disabled?: boolean
}

export const FeatureCard: React.FC<Props> = ({
  name,
  description,
  image,
  link,
  disabled,
}) => {
  const body = (
    <div
      className={cx([
        'flex flex-col items-center rounded-3xl bg-layer-2 px-5 py-10 transition duration-500 mobile:py-5',
        disabled
          ? ['hover:cursor-not-allowed']
          : ['hover:cursor-pointer', 'hover:scale-[1.1]', 'hover:bg-muted-3'],
      ])}
    >
      <img
        src={image}
        alt={name}
        className="aspect-[2] w-full object-contain"
      />
      <div className="mt-2 text-2xl font-bold text-white mobile:text-xl">
        {name}
      </div>
      <div className="text-center text-sm">{description}</div>
    </div>
  )

  if (disabled) {
    return body
  }

  return <Link to={link}>{body}</Link>
}
