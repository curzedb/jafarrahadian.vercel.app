"use client";

import { useState, useEffect } from 'react';
import styles from './TypingAnimation.module.scss';
import { useLocale } from '@/i18n/client';

export const TypingAnimation = () => {
  const [text, setText] = useState('');
  const { locale } = useLocale();
  const fullText = locale === 'id' ? 'Segera Hadir...' : 'Available Soon...';

  useEffect(() => {
    const textChars = Array.from(fullText);
    let index = 0;
    setText(''); 

    const intervalId = setInterval(() => {
      if (index < textChars.length) {
        setText((prev) => prev + textChars[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 200); 

    return () => clearInterval(intervalId);
  }, [fullText]);

  return (
    <div className={styles.typingContainer}>
      <span className={styles.typingText}>{text}</span>
      <span className={styles.cursor} />
    </div>
  );
};