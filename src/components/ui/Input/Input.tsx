import { InputHTMLAttributes, memo, useRef } from 'react';
import { classNames } from '../../../libs/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
    const { className, value, onChange, type = 'text', placeholder, ...otherProps } = props;
    const ref = useRef<HTMLInputElement>(null);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                placeholder={placeholder}
                {...otherProps}
            />
        </div>
    );
});
