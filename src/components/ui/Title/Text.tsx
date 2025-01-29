import { memo } from 'react';
import cls from './Text.module.scss';
import { classNames, Mods } from '../../../libs/classNames';

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    align?: TextAlign;
}

export const TextEl = memo((props: TextProps) => {
    const { className, text, title, align = TextAlign.LEFT } = props;

    const mods: Mods = {
        [cls[align]]: true,
    };

    return (
        <div className={classNames(cls.Text, mods, [className])}>
            {title && <h2 className={cls.title}>{title}</h2>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
