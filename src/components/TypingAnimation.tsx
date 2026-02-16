"use client";

import { useState, useEffect } from 'react';
import styles from './TypingAnimation.module.scss';
import { useLocale } from '@/i18n/client';

export const TypingAnimation = () => {
  const [text, setText] = useState('');
  const { locale } = useLocale();
  const fullText = locale === 'id' ? 'Segera Hadir...' : 'Available Soon...';

  useEffect(() => {
    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let isActive = true;

    setText('');

    const typeNext = () => {
      if (!isActive) return;
      if (index >= fullText.length) return;

      index += 1;
      setText(fullText.slice(0, index));
      timeoutId = setTimeout(typeNext, 200);
    };

    timeoutId = setTimeout(typeNext, 200);

    return () => {
      isActive = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fullText]);

  return (
    <div className={styles.typingContainer}>
      <span className={styles.typingText}>{text}</span>
      <span className={styles.cursor} />
    </div>
  );
};