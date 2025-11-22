import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  onSave: () => void;
  message: { type: 'success' | 'error' | null; text: string } | null;
}

/**
 * Header component with save button and notification messages
 */
const Header: React.FC<HeaderProps> = ({ onSave, message }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>💬</div>
        <h1 className={styles.title}>Chatbot Flow Builder</h1>
      </div>
      
      {message && (
        <div className={`${styles.message} ${styles[message.type || '']}`}>
          {message.text}
        </div>
      )}
      
      <button className={styles.saveButton} onClick={onSave}>
        <span className={styles.saveIcon}>💾</span>
        Save Changes
      </button>
    </header>
  );
};

export default Header;
