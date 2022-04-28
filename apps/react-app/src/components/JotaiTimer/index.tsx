import { fetchedDataAtom, secondsAtom, toggleTimerAtom } from "@state-managers/atomic-jotai";
import { useAtom, useAtomValue } from "jotai";
import { Timer } from "../Timer";

export function JotaiTimer() {
  const seconds = useAtomValue(secondsAtom)
  const [timerState, toggleTimer] = useAtom(toggleTimerAtom)
  const fetchedData = useAtomValue(fetchedDataAtom)
  
  return <Timer id="Jotai" seconds={seconds} isRunning={timerState === 'running'} toggleTimer={toggleTimer} fetchedData={fetchedData} />
}

