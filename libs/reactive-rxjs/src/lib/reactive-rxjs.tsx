import { BehaviorSubject } from "rxjs";
import { useObservableState } from "observable-hooks";
import { normalizeFetchData } from "@state-managers/state-normalized";

const seconds$ = new BehaviorSubject<number>(0)
const timerState$ = new BehaviorSubject<'running' | 'stoped'>('stoped')
const fetchedData$ = new BehaviorSubject<{
  byId: Record<string, {id: string, data: string}>
  allIds: string[]
}>({
  byId: {},
  allIds: [],
})

let intervalId: number | undefined
timerState$.subscribe((timerState) => {
  if (timerState === 'stoped') {
    window.clearInterval(intervalId);
    intervalId = undefined;
  }

  if (timerState === 'running') {
    intervalId = window.setInterval(() => {
      seconds$.next(seconds$.value + 0.1);
    }, 100);
  }
})

seconds$.subscribe(async (seconds) => {
  if (seconds > 1 && !fetchedData$.value.allIds.length) {
    const response = await fetch('/assets/fetchData.json')

    const parsedData: {id: string, data: string}[]  = await response.json()

    const {byId, allIds} = normalizeFetchData(parsedData)

    fetchedData$.next({ byId, allIds })
  }
});

export const useTimerState = () => useObservableState(timerState$);
export const useSeconds = () => useObservableState(seconds$);
export const useFetchedData = () => useObservableState(fetchedData$);
export const toggleTimer = () => timerState$.next(timerState$.value === 'running' ? 'stoped' : 'running');