import { setupWorker } from 'msw'
import sampleApi from './api/sampleApi'

const handlers = [
  ...sampleApi
]

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)
