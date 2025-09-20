"use client";

import { useState, useEffect } from 'react';
import styles from './TypingAnimation.module.scss';

export const TypingAnimation = () => {
  const [text, setText] = useState('');
  const fullText = 'Avvailable Soon...';

  useEffect(() => {
    let index = 0;
    setText(''); 

    const intervalId = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 200); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.typingContainer}>
      <span className={styles.typingText}>{text}</span>
      <span className={styles.cursor}></span>
    </div>
  );
};