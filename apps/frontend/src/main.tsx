/* This file contains the entry point for the React application */
// @ts-ignore - React is needed for JSX
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VaporwaveApp from './VaporwaveApp'

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  // @ts-expect-error React 18 types compatibility issue
  root.render(<VaporwaveApp />)
}
