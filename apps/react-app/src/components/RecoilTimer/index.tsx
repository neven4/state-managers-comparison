import { fetchedDataAtom, secondsAtom, timerStateAtom, useTimer } from "@state-managers/atomic-recoil";
import { useCallback } from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { Timer } from "../Timer";

function TimerWithRecoil() {
  useTimer()
  const seconds = useRecoilValue(secondsAtom)
  const [timerState, setTimerState] = useRecoilState(timerStateAtom)
  const fetchedData = useRecoilValue(fetchedDataAtom)

  const toggleTimer = useCallback(
    () => {
      setTimerState(timerState => timerState === 'running' ? 'stoped' : 'running')
    },
    [setTimerState],
  )
  
  
  return <Timer id="Recoil" seconds={seconds} isRunning={timerState === 'running'} toggleTimer={toggleTimer} fetchedData={fetchedData} />
}

export function RecoilTimer() {
  return <RecoilRoot>
    <TimerWithRecoil />
  </RecoilRoot>
}

