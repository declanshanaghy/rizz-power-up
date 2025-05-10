// @ts-nocheck
/* This file is excluded from TypeScript type checking to avoid build errors */
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VaporwaveApp from './VaporwaveApp'

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<VaporwaveApp />)
}
