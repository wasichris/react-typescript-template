import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { IMsgBoxProps } from '../../components/MsgBox'

export type GlobalMsgBoxProps = Omit<IMsgBoxProps, 'isVisible' | 'onRequestClose'> & {
  isIgnoreRestMsg?: boolean
};

const isDifferentMsg = (props1: GlobalMsgBoxProps, props2: GlobalMsgBoxProps) => {
  const { title: title1, content: content1 } = props1
  const { title: title2, content: content2 } = props2
  return (title1 !== title2 || content1 !== content2)
}

// Define the initial state
const initialState = {
  queue: [] as GlobalMsgBoxProps[]
}

// Slice
const msgSlice = createSlice({
  name: 'msg',
  initialState,
  reducers: {
    addMsgBox: (state, action: PayloadAction<GlobalMsgBoxProps>) => {
      const { payload: msbBoxProps } = action
      state.queue.push(msbBoxProps)
    },
    removeMsgBox: (state) => {
      if (state.queue.length > 0) {
        // if mark as last msg, then clean msg queue
        const currentMsgBox = state.queue[0]
        if (currentMsgBox.isIgnoreRestMsg) state.queue = []

        // get next msg
        while (state.queue.length > 0) {
          const currentMsgBox = state.queue.shift()
          if (state.queue.length > 0) {
            const nextMsgBox = state.queue[0]
            if (isDifferentMsg(currentMsgBox!, nextMsgBox)) {
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
export const selectCurrentMsgBox = (state: RootState) => state.msg.queue[0]

// Action creators are generated for each case reducer function
export const { addMsgBox, removeMsgBox } = msgSlice.actions
export default msgSlice
