import type { TagStyleProps } from '~/styles'
import { tag } from '~/styles'

type Props = {
  label: string
  icon?: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>
} & TagStyleProps

export const Tag: React.FC<Props> = ({
  label,
  icon,
  iconPosition = 'leading',
  type = 'default',
}) => {
  const Icon = icon

  const renderIcon = Icon ? <Icon className="h-4 w-4" /> : <></>

  return (
    <span
      className={tag({
        type,
      })}
    >
      {iconPosition === 'leading' && Icon && renderIcon}
      {label}
      {iconPosition === 'trailing' && Icon && renderIcon}
    </span>
  )
}
