import React from 'react';
import type { ReactNode, MouseEvent } from 'react';
import Link from 'next/link';

type BtnColor = 'primary' | 'secondary' | 'alert';
type BtnStyle = 'outline' | '';
type BtnSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | '';
type IconPosition = 'before' | 'after';

interface BtnProps {
  children?: ReactNode;
  message?: string;
  color?: BtnColor;
  style?: BtnStyle;
  size?: BtnSize;
  icon?: string;
  iconPosition?: IconPosition;
  disabled?: boolean;
  disabledBtn?: boolean;
  link?: string;
  className?: string;
  onClickFunction?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Btn({
  children,
  message = '',
  color = 'primary',
  style = '',
  size = '',
  icon,
  iconPosition = 'before',
  disabled = false,
  disabledBtn,
  link,
  className = '',
  onClickFunction,
}: BtnProps) {
  const cssClasses = ['btnUi'];

  let styleClass = 'btn';
  if (style === 'outline') {
    styleClass += '_' + style;
  }
  styleClass += '_' + color;
  cssClasses.push(styleClass);

  if (disabled) {
    cssClasses.push('btn_disabled');
  }

  if (size) {
    cssClasses.push('btn_' + size);
  }

  if (className) {
    cssClasses.push(className);
  }

  const finalClassName = cssClasses.join(' ');

  if (link) {
    return (
      <Link href={link}>
        <a className={finalClassName}>{message}</a>
      </Link>
    );
  }

  return (
    <button
      disabled={disabledBtn ?? false}
      className={finalClassName}
      onClick={onClickFunction}
    >
      {icon && iconPosition !== 'after' && <i className={icon} />}
      {message && <span className="btn_txt">{message}</span>}
      {children && <span className="btn_txt">{children}</span>}
      {icon && iconPosition === 'after' && <i className={icon} />}
    </button>
  );
}
