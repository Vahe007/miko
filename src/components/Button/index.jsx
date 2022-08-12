import React from 'react'
import styles from './Button.module.css';

const Button = (props) => {
    const {title, ...otherProps} = props;
    const {btn} = styles;
  return (
    <button {...otherProps} className={btn}>{title}</button>
  )
}

export default Button
