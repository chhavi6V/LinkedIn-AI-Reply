# LinkedIn AI Reply Chrome Extension 🤖

A Chrome extension built with React, TypeScript, and Tailwind CSS that assists users in generating replies to LinkedIn messages. This project was completed as part of the ChatGPT Writer take-home assignment.

## Demo 🎥

https://github.com/user-attachments/assets/52e832c2-b80a-49c5-8f82-c471a8a0b123

## Features ⭐

- 💬 AI reply icon appears when focusing on LinkedIn message input field
- 🔲 Modal interface for generating message replies
- ⚡ Quick insertion of generated responses into LinkedIn messages
- 🎨 Responsive and user-friendly design following Figma specifications
- 🔒 Works completely offline - no API calls needed
- 🎯 Minimalist and intuitive user interface
- ⚡ Fast and lightweight implementation
- 🔌 Seamless integration with LinkedIn's messaging interface

## Key Functionalities 🔑

1. **Smart Icon Display**
  - Icon appears automatically when message input is focused
  - Disappears when focus is lost
  - Non-intrusive positioning

2. **Interactive Modal**
  - Center-aligned design
  - Click-outside functionality to close
  - Smooth animations
  - Responsive layout

3. **Message Generation**
  - Quick command input field
  - Generate button with instant response
  - One-click insertion into LinkedIn message
  - Regenerate option (UI only)

## Tech Stack 🛠️

- 🔌 WXT Framework for Chrome Extension
   - Latest version for optimal performance
   - Built-in TypeScript support
   - Modern extension development workflow

- ⚛️ React with TypeScript
   - Functional components
   - Custom hooks for state management
   - Type-safe development
   - React 18+ features

- 🎭 Tailwind CSS for styling
   - Utility-first approach
   - Responsive design
   - Custom configurations
   - Optimized for production

- 🎯 Additional Technologies
   - SVG icons (exported from Figma)
   - ES6+ JavaScript features
   - Modern CSS practices
   - Chrome Extension Manifest V3

## Installation 📥

1. Clone the repository
```bash
git clone https://github.com/chhavi6V/LinkedIn-AI-Reply.git
cd LinkedIn-AI-Reply

```

2. Install Dependencies
```bash
npm install
```

3. Build the extension
```bash
npm run build
```

4. Load the extension in Chrome:

- 🌐 Open Chrome and navigate to chrome://extensions/
- 🔧 Enable "Developer mode"
- ➕ Click "Load unpacked"
- 📁 Select the .output directory from the project

## Usage 📖

- 🌐 Navigate to LinkedIn and open any conversation
- 💭 Click into the message input field
- 🔍 Look for the AI icon that appears
- 🖱️ Click the icon to open the response generation modal
- ⌨️ Enter your command and click "Generate"
- ➡️ Use the "Insert" button to add the response to your message

## Note 📝
This is a demo extension created for assessment purposes. It uses static responses and does not make actual API calls for generating messages.
