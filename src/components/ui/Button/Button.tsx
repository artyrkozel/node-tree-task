import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import cls from './Button.module.scss';
import { classNames, Mods } from '../../../libs/classNames';
import { ButtonTheme } from '../../../types/types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children?: ReactNode;
    variant?: ButtonTheme;
    disabled?: boolean;
}

export const Button = memo((props: ButtonProps) => {
    const { className = '', children, variant = ButtonTheme.PRIMARY, disabled, ...otherProps } = props;

    const mods: Mods = {
        [cls[variant]]: true,
    };

    return (
        <button type="button" className={classNames(cls.Button, mods, [className])} disabled={disabled} {...otherProps}>
            {children}
        </button>
    );
});
