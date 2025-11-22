import React, { useState, useEffect } from 'react';
import type { Node } from '@xyflow/react';
import styles from './SettingsPanel.module.css';

interface SettingsPanelProps {
    selectedNode: Node | null;
    onUpdateNode: (nodeId: string, data: any) => void;
    onClose: () => void;
}

/**
 * SettingsPanel component - allows editing of selected node properties
 * Currently supports text message editing for TextNode
 */
const SettingsPanel: React.FC<SettingsPanelProps> = ({
    selectedNode,
    onUpdateNode,
    onClose,
}) => {
    const [message, setMessage] = useState('');

    // Update local state when selected node changes
    useEffect(() => {
        if (selectedNode?.data) {
            const nodeData = selectedNode.data as { message?: string };
            setMessage(nodeData.message || '');
        } else {
            setMessage('');
        }
    }, [selectedNode]);

    // Handle message change
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newMessage = e.target.value;
        setMessage(newMessage);

        // Update node data in real-time
        if (selectedNode) {
            onUpdateNode(selectedNode.id, {
                ...selectedNode.data,
                message: newMessage,
            });
        }
    };

    if (!selectedNode) {
        return null;
    }

    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={onClose}>
                    <span className={styles.backIcon}>←</span>
                </button>
                <h2 className={styles.title}>Message Settings</h2>
            </div>

            <div className={styles.content}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="message-text">
                        Text
                    </label>
                    <textarea
                        id="message-text"
                        className={styles.textarea}
                        value={message}
                        onChange={handleMessageChange}
                        placeholder="Enter your message here..."
                        rows={6}
                    />
                    <p className={styles.hint}>
                        This message will be sent in the chatbot flow
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;
