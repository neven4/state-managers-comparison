import { normalizeFetchData } from "@state-managers/state-normalized";
import { atom } from "jotai";


export const secondsAtom = atom(0)

const increaseSecondsAtom = atom(null, async (get, set, numOfSeconds: number) => {
  set(secondsAtom, get(secondsAtom) + numOfSeconds)

  if (get(secondsAtom) > 1 && !get(fetchedDataAtom).allIds.length) {
    const response = await fetch('/assets/fetchData.json')

    const parsedData: {id: string, data: string}[]  = await response.json()

    const {byId, allIds} = normalizeFetchData(parsedData)

    set(fetchedDataAtom, { byId, allIds })
  }
})

export const timerStateAtom = atom<'running' | 'stoped'>('stoped')

export const fetchedDataAtom = atom<{
  byId: Record<string, {id: string, data: string}>
  allIds: string[]
}>({
  byId: {},
  allIds: [],
})

export const intervalIdAtom = atom<number | undefined>(undefined)

export const toggleTimerAtom = atom((get) => get(timerStateAtom), (get, set) => {
  const timerState = get(timerStateAtom)

  if (timerState === 'stoped') {
    const intervalId = window.setInterval(() => {
      set(increaseSecondsAtom, 0.1)
    }, 100)

    set(intervalIdAtom, intervalId)
    set(timerStateAtom, 'running')
  }

  if (timerState === 'running') {
    window.clearInterval(get(intervalIdAtom))

    set(timerStateAtom, 'stoped')
  }
})