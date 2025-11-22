import React from 'react';
import styles from './NodesPanel.module.css';

/**
 * NodesPanel component - displays available node types for drag-and-drop
 * Extensible design to add more node types in the future
 */
const NodesPanel: React.FC = () => {
    // Handle drag start - set the node type being dragged
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <h2 className={styles.title}>Nodes</h2>
                <p className={styles.subtitle}>Drag to add</p>
            </div>

            <div className={styles.nodeList}>
                {/* Text Message Node */}
                <div
                    className={styles.nodeCard}
                    draggable
                    onDragStart={(e) => onDragStart(e, 'textNode')}
                >
                    <div className={styles.nodeIcon}>💬</div>
                    <div className={styles.nodeInfo}>
                        <h3 className={styles.nodeName}>Message</h3>
                        <p className={styles.nodeDescription}>Send a text message</p>
                    </div>
                </div>

                {/* Future node types can be added here */}
                {/* Example:
        <div
          className={styles.nodeCard}
          draggable
          onDragStart={(e) => onDragStart(e, 'imageNode')}
        >
          <div className={styles.nodeIcon}>🖼️</div>
          <div className={styles.nodeInfo}>
            <h3 className={styles.nodeName}>Image</h3>
            <p className={styles.nodeDescription}>Send an image</p>
          </div>
        </div>
        */}
            </div>
        </div>
    );
};

export default NodesPanel;
