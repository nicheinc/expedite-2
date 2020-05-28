import React, { FunctionComponent } from 'react';
import styles from './Button.module.scss';
import { classNames } from '../utilities/css';
export type Type = 'default' | 'action';

interface Props {
  /**
   * Click event handler
   * @default null
   */
  onClick?: () => void;

  /**
   * Button type
   */
  type?: Type;
  fullWidth?: boolean;
}

const Button: FunctionComponent<Props> = ({ children, type = 'default', onClick, fullWidth = true }) => {
  const className = classNames(
    styles.button,
    fullWidth && styles.wide,
  );
  
  return (
    <button type="button" className={className} onClick={onClick}>
      {type}: {children}
    </button>
  );
};

export default Button;
