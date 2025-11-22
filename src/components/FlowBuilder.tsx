import React, { useState, useCallback, useRef } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    type Node,
    type Edge,
    type Connection,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
    type OnConnect,
    type NodeTypes,
    type ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Header from './Header';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import TextNode from './nodes/TextNode';
import styles from './FlowBuilder.module.css';

// Define custom node types
const nodeTypes: NodeTypes = {
    textNode: TextNode,
};

/**
 * FlowBuilder - Main component for the chatbot flow builder
 * Manages the entire flow state and orchestrates all interactions
 */
const FlowBuilder: React.FC = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    // Counter for generating unique node IDs
    const nodeIdCounter = useRef(1);

    /**
     * Handle node click - select node and show settings panel
     */
    const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
        setSelectedNode(node);
    }, []);

    /**
     * Handle connection between nodes
     * Validates that source handle doesn't already have an outgoing edge
     */
    const onConnect: OnConnect = useCallback(
        (params: Connection) => {
            // Check if source handle already has an outgoing edge
            const sourceHasEdge = edges.some(
                (edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle
            );

            if (sourceHasEdge) {
                // Show error message
                setMessage({
                    type: 'error',
                    text: 'A node can only have one outgoing connection',
                });
                setTimeout(() => setMessage(null), 3000);
                return;
            }

            // Add the new edge
            setEdges((eds) => addEdge(params, eds));
        },
        [edges, setEdges]
    );

    /**
     * Handle drag over canvas - allow drop
     */
    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    /**
     * Handle drop on canvas - create new node
     */
    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            // Check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            // Check if reactFlowInstance is available
            if (!reactFlowInstance) {
                return;
            }

            // Convert screen coordinates to flow coordinates
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            // Create new node
            const newNode: Node = {
                id: `node-${nodeIdCounter.current++}`,
                type,
                position,
                data: {
                    label: 'Send Message',
                    message: 'Enter your message here',
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes]
    );

    /**
     * Update node data when edited in settings panel
     */
    const handleUpdateNode = useCallback(
        (nodeId: string, data: any) => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === nodeId) {
                        return { ...node, data };
                    }
                    return node;
                })
            );
        },
        [setNodes]
    );

    /**
     * Close settings panel
     */
    const handleCloseSettings = useCallback(() => {
        setSelectedNode(null);
    }, []);

    /**
   * Save flow with validation
   * Validation rules:
   * 1. Must have more than one node
   * 2. All nodes must be connected (no isolated nodes)
   */
    const handleSave = useCallback(() => {
        // Check if there are more than one nodes
        if (nodes.length <= 1) {
            setMessage({
                type: 'error',
                text: 'Flow must have more than one node',
            });
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        // Check if all nodes are connected (each node should have at least one edge)
        const unconnectedNodes = nodes.filter((node) => {
            const hasIncoming = edges.some((edge) => edge.target === node.id);
            const hasOutgoing = edges.some((edge) => edge.source === node.id);
            return !hasIncoming && !hasOutgoing;
        });

        // If there are any completely unconnected nodes, show error
        if (unconnectedNodes.length > 0) {
            setMessage({
                type: 'error',
                text: 'Cannot save Flow - all nodes must be connected',
            });
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        // Save successful
        setMessage({
            type: 'success',
            text: 'Flow saved successfully!',
        });
        setTimeout(() => setMessage(null), 3000);

        // Here you could save to localStorage or send to backend
        console.log('Saving flow:', { nodes, edges });
    }, [nodes, edges]);

    /**
     * Handle canvas click - deselect node
     */
    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, []);

    return (
        <div className={styles.container}>
            <Header onSave={handleSave} message={message} />

            <div className={styles.main}>
                {/* Left Panel - Nodes or Settings */}
                {selectedNode ? (
                    <SettingsPanel
                        selectedNode={selectedNode}
                        onUpdateNode={handleUpdateNode}
                        onClose={handleCloseSettings}
                    />
                ) : (
                    <NodesPanel />
                )}

                {/* Canvas */}
                <div className={styles.canvas} ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={onNodeClick}
                        onPaneClick={onPaneClick}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        nodeTypes={nodeTypes}
                        fitView
                        attributionPosition="bottom-right"
                    >
                        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
                        <Controls />
                        <MiniMap
                            nodeColor={(node) => {
                                if (node.id === selectedNode?.id) return '#818cf8';
                                return '#6366f1';
                            }}
                            maskColor="rgba(15, 23, 42, 0.8)"
                        />
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
};

export default FlowBuilder;
