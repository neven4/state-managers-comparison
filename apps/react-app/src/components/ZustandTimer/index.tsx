import { useAppStore } from "@state-managers/zustand-app-state";
import { Timer } from "../Timer";

export function ZustandTimer() {
  const seconds = useAppStore(state => state.seconds)
  const timerState = useAppStore(state => state.timerState)
  const fetchedData = useAppStore(state => state.fetchedData)
  const toggleTimerState = useAppStore(state => state.onToggleTimerState)
  
  return <Timer id="Zustand" seconds={seconds} isRunning={timerState === 'running'} toggleTimer={toggleTimerState} fetchedData={fetchedData} />
}