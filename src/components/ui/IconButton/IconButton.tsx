import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
    title?: string;
    className?: string;
    rotateIcon?: boolean;
}

export const IconButton: React.FC<ButtonProps> = ({
    icon,
    title,
    disabled = false,
    rotateIcon,
    ...otherProps
}) => {

    return (
        <button type="button" {...otherProps} style={{ width: 20, height: 20 }}>
            <img
                src={icon}
                className="logo react"
                alt="React logo"
            />
        </button>
    );
};
