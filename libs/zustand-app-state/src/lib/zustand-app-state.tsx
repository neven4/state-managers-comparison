import { normalizeFetchData } from "@state-managers/state-normalized"
import create from "zustand"

interface AppStoreState {
  seconds: number
  fetchedData: {
    byId: Record<string, {id: string, data: string}>
    allIds: string[]
  }
  timerState: 'running' | 'stoped'
  onToggleTimerState: () => void
  onIncreaseSeconds: () => void
}

let timerInterval: number | undefined

export const useAppStore = create<AppStoreState>((set, get) => ({
  seconds: 0,
  timerState: 'stoped',
  fetchedData: {
    byId: {},
    allIds: [],
  },
  onToggleTimerState: () => {
    const timerState = get().timerState

    if (timerState === 'stoped') {
      set({ timerState: 'running' })

      timerInterval = window.setInterval(() => get().onIncreaseSeconds(), 100);
    }

    if (timerState === 'running') {
      set({ timerState: 'stoped' })

      window.clearInterval(timerInterval)
    }
  },
  onIncreaseSeconds: async () => {
    set(state => ({
      seconds: state.seconds + 0.1,
    }))

    if (get().seconds > 1 && !get().fetchedData.allIds.length) {
      const response = await fetch('/assets/fetchData.json')

      const parsedData: {id: string, data: string}[]  = await response.json()

      const {byId, allIds} = normalizeFetchData(parsedData)

      set({fetchedData: { byId, allIds }})
    }
  },
}))



