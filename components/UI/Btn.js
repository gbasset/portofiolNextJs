import React from 'react'

import Link from 'next/link'
export default function Btn({
    children,
    onClickFunction,
    message = '',
    color = 'primary',
    style = '',
    disabled = false,
    size = '',
    icon,
    iconPosition = 'before',
    disabledBtn,
    link
}) {

    const cssClass = ['btnUi'];

    // Style and Color
    let styleClass = 'btn';
    if (style === 'outline') {
        styleClass += '_' + style;
    }
    styleClass += '_' + color;
    cssClass.push(styleClass);

    // Disabled
    if (disabled) {
        cssClass.push('btn_disabled');
    }

    // Size : xs, s, default, l, xl, xxl
    if (size) {
        let sizeClass = 'btn_' + size;
        cssClass.push(sizeClass);
    }

    return (
        <>
            {link &&
                <Link href={link}>
                    <a className={cssClass.join(' ')}>{message}</a>
                </Link>}
            {!link && <button
                disabled={disabledBtn ? disabledBtn : false}
                className={cssClass.join(' ')}
                onClick={(e) => onClickFunction(e)}>
                {icon && iconPosition !== 'after' &&
                    <i className={`${icon}`}></i>
                }
                {message &&
                    <span className="btn_txt">{message}</span>
                }
                {children &&
                    <span className="btn_txt">{children}</span>
                }
                {icon && iconPosition === 'after' &&
                    <i className={`${icon}`}></i>
                }
            </button>}
        </>
    )
}
