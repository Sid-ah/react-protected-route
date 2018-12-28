import React from 'react';

export const ButtonDelete = ({text, className, deleteCompleted}) => {
  return <button className={`${className} delete-completed`} onClick={() => deleteCompleted()}>{text}</button>
}

export const Button = ({className, text, setActiveFilter}) => {
  return <button className={className(text)} onClick={() => setActiveFilter(text)}>{text}</button>
}

