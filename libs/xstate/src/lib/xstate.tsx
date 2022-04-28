import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";

type StopwatchEvent = { type: "TOGGLE" } | { type: "TICK" };
type StopwatchContext = {
  seconds: number
  fetchedData: {
    byId: Record<string, {id: string, data: string}>
    allIds: string[]
  }
};

const stopwatchMachine = createMachine<StopwatchContext, StopwatchEvent>({
  id: "stopwatch",
  initial: "stopped",
  context: {
    seconds: 0,
    fetchedData: {
      byId: {},
      allIds: [],
    },
  },
  states: {
    stopped: {
      on: { TOGGLE: "running" },
    },
    running: {
      invoke: {
        src: () => (cb) => {
          const interval = setInterval(() => cb("TICK"), 100);
          return () => {
            clearInterval(interval);
          };
        },
      },
      on: {
        TOGGLE: "stopped",
        TICK: {
          actions: (context) => {
            context.seconds += 0.1;
            if (context.seconds > 2 && !context.names) {
              fetch("/names.json")
                .then((res) => res.json())
                .then(({ names }) => (context.names = names));
            }
          },
        },
      },
    },
  },
});

interface ApplicationState extends StopwatchContext {
  timerState: 'stoped' | 'running';
  onToggle: () => void;
}

const ApplicationContext = createContext<ApplicationState>({
  seconds: 0,
  timerState: 'stoped',
  onToggle: () => {},
});

const useApplicationState = (): ApplicationState => {
  const [state, send] = useMachine(stopwatchMachine);

  return {
    seconds: state.context.seconds,
    names: state.context.names,
    running: state.value !== "stopped",
    onToggle: () => send("TOGGLE"),
  };
};

export const ApplicationContextProvider: React.FunctionComponent = ({
  children,
}) => (
  <ApplicationContext.Provider value={useApplicationState()}>
    {children}
  </ApplicationContext.Provider>
);

export const useApplicationContext = () => useContext(ApplicationContext);