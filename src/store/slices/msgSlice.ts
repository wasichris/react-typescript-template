import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { IMsgBoxProps } from '../../components/MsgBox'

export type GlobalMsg = Omit<IMsgBoxProps, 'isVisible' | 'onRequestClose'> & {
  isIgnoreRestMsg?: boolean
};

const isDifferentMsg = (props1: GlobalMsg, props2: GlobalMsg) => {
  const { title: title1, content: content1 } = props1
  const { title: title2, content: content2 } = props2
  return (title1 !== title2 || content1 !== content2)
}

// Define the initial state
const initialState = {
  queue: [] as GlobalMsg[]
}

// Slice
const msgSlice = createSlice({
  name: 'msg',
  initialState,
  reducers: {
    addGlobalMsg: (state, action: PayloadAction<GlobalMsg>) => {
      const { payload: msbBoxProps } = action
      state.queue.push(msbBoxProps)
    },
    removeCurrentGlobalMsg: (state) => {
      if (state.queue.length > 0) {
        // if mark as last msg, then clean msg queue
        const currentMsg = state.queue[0]
        if (currentMsg.isIgnoreRestMsg) state.queue = []

        // get next msg
        while (state.queue.length > 0) {
          const currentMsg = state.queue.shift()
          if (state.queue.length > 0) {
            const nextMsg = state.queue[0]
            if (isDifferentMsg(currentMsg!, nextMsg)) {
              break
            }
          }
        }
      }
    }
  }
})

// Selection
// plz prefixing selector function names with 'select'
export const selectCurrentGlobalMsg = (state: RootState) => state.msg.queue[0]

// Action creators are generated for each case reducer function
export const { addGlobalMsg, removeCurrentGlobalMsg } = msgSlice.actions
export default msgSlice
