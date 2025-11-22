import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import styles from './TextNode.module.css';

export interface TextNodeData {
    label: string;
    message: string;
}

/**
 * TextNode - Custom node component for text messages
 * Features:
 * - One source handle (right) - only one outgoing edge allowed
 * - One target handle (left) - multiple incoming edges allowed
 * - Displays message preview
 */
const TextNode: React.FC<NodeProps> = ({ data, selected }) => {
    const nodeData = data as unknown as TextNodeData;

    return (
        <div className={`${styles.node} ${selected ? styles.selected : ''}`}>
            {/* Target handle - left side (can have multiple incoming edges) */}
            <Handle
                type="target"
                position={Position.Left}
                className={styles.handle}
                id="target"
            />

            <div className={styles.header}>
                <div className={styles.icon}>💬</div>
                <div className={styles.label}>{nodeData.label}</div>
            </div>

            <div className={styles.content}>
                <div className={styles.message}>
                    {nodeData.message || 'Click to edit message'}
                </div>
            </div>

            {/* Source handle - right side (only one outgoing edge allowed) */}
            <Handle
                type="source"
                position={Position.Right}
                className={styles.handle}
                id="source"
            />
        </div>
    );
};

export default TextNode;
