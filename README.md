# Chatbot Flow Builder

A modern, interactive chatbot flow builder built with React, TypeScript, and React Flow. Create and manage chatbot conversation flows with an intuitive drag-and-drop interface.


## ✨ Features

- **Drag & Drop Interface**: Easily add message nodes to your flow by dragging from the nodes panel
- **Visual Flow Building**: Connect nodes to define conversation paths
- **Smart Validation**: 
  - Prevents multiple outgoing connections from a single node
  - Validates flow structure before saving
- **Real-time Editing**: Click any node to edit its message content
- **Modern UI**: Dark theme with glassmorphism effects and smooth animations
- **Responsive Design**: Works seamlessly across different screen sizes

## 🛠️ Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **React Flow** - Flow diagram library
- **Vite** - Build tool
- **CSS Modules** - Scoped styling

## 📋 Requirements Met

This project fulfills all the requirements from the BiteSpeed Frontend Task:

1. ✅ **Text Node**: Supports text message nodes with editable content
2. ✅ **Nodes Panel**: Drag-and-drop panel with extensible design for future node types
3. ✅ **Edge Connections**: Connect nodes with source and target handles
4. ✅ **Connection Validation**: Only one edge can originate from a source handle
5. ✅ **Settings Panel**: Edit node content when selected
6. ✅ **Save Validation**: Validates flow before saving (must have >1 node, only one unconnected node allowed)
7. ✅ **Error Handling**: Clear error messages for invalid operations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bite-speed.git

# Navigate to project directory
cd bite-speed

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

## 🎯 How to Use

1. **Add Nodes**: Drag the "Message" node from the left panel onto the canvas
2. **Connect Nodes**: Click and drag from the right handle (source) of one node to the left handle (target) of another
3. **Edit Messages**: Click on any node to open the settings panel and edit its message
4. **Save Flow**: Click the "Save Changes" button to validate and save your flow

### Validation Rules

- Flow must contain more than one node
- Only one node can be unconnected (the starting node)
- Each node can have only one outgoing connection

## 🏗️ Project Structure

```
src/
├── components/
│   ├── FlowBuilder.tsx       # Main flow builder component
│   ├── Header.tsx             # Header with save button
│   ├── NodesPanel.tsx         # Draggable nodes panel
│   ├── SettingsPanel.tsx      # Node settings editor
│   └── nodes/
│       └── TextNode.tsx       # Custom text message node
├── App.tsx                    # Root component
├── index.css                  # Global styles and design system
└── main.tsx                   # Application entry point
```

## 📝 Future Enhancements

The codebase is designed to be extensible. Potential additions include:

- Additional node types (Image, Button, Conditional Logic)
- Flow templates and presets




This project is created as part of the BiteSpeed Frontend Task.
