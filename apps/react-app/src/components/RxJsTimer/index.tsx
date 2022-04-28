import { Timer } from "../Timer";
import {useSeconds, useTimerState, useFetchedData, toggleTimer} from '@state-managers/reactive-rxjs'

export function RxJsTimer() {
  const seconds = useSeconds()
  const timerState = useTimerState()
  const fetchedData = useFetchedData()
  
  return <Timer id="RxJs" seconds={seconds} isRunning={timerState === 'running'} toggleTimer={toggleTimer} fetchedData={fetchedData} />
}

