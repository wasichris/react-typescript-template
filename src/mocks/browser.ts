import { setupWorker } from 'msw'
import sample from './api/sample'

const handlers = [
  ...sample
]

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)
