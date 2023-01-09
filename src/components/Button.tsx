import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface IProps {
  outfit?: 'primary' | 'link' | undefined;
}

const Button = (props: IProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, outfit, type = 'button', children, ...restProps } = props
  return (
    <button
      className={clsx('c-button', outfit && `c-button--outfit-${outfit}`, className)}
      type={type}
      {...restProps}
    >

      {children}

    </button>
  )
}

export default Button
