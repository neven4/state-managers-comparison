import { normalizeFetchData } from "@state-managers/state-normalized";
import { useCallback, useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";

export const secondsAtom = atom({
  key: 'seconds',
  default: 0,
})

export const timerStateAtom = atom<'running' | 'stoped'>({
  key: 'timerState',
  default: 'stoped',
})

export const fetchedDataAtom = atom<{
  byId: Record<string, {id: string, data: string}>
  allIds: string[]
}>({
  key: 'fetchedData',
  default: {
    byId: {},
    allIds: [],
  }
})

export const useTimer = () => {
  const [seconds, setSeconds] = useRecoilState(secondsAtom)
  const timerState = useRecoilValue(timerStateAtom)
  const [fetchedData, setFetchedData] = useRecoilState(fetchedDataAtom)

  const fetchData = useCallback(async () => {
    const response = await fetch('/assets/fetchData.json')

    const parsedData: {id: string, data: string}[]  = await response.json()

    const {byId, allIds} = normalizeFetchData(parsedData)

    setFetchedData({ byId, allIds })
  }, [setFetchedData])

  useEffect(() => {
    if (seconds > 1 && !fetchedData.allIds.length) {
      fetchData()
    }
  }, [seconds, fetchData, fetchedData.allIds.length])

  useEffect(() => {
    let interval: number | undefined

    if (timerState === 'running') {
      interval = window.setInterval(() => {
        setSeconds(seconds => seconds + 0.1)
      }, 100)
    }

    if (timerState === 'stoped') {
      window.clearInterval(interval)
    }

    return () => window.clearInterval(interval)
  }, [setSeconds, timerState])
}
