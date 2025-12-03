// import { create } from "zustand";

// interface CounterState {
//     count: number;
//     increaseCount: () => void;
//     decreaseCount: () => void;
// }

// const CounterGlobalStateZust = create<CounterState>((set) => ({
//     count: 0,
//     increaseCount: () =>
//         set((state) => ({ count: state.count + 1 })),
//     decreaseCount: () =>
//         set((state) => ({ count: state.count - 1 })),
// }));

// export default CounterGlobalStateZust;

import { create } from "zustand";

interface Props {
    normalVal: number,
    increaseIt: () => void,
    decreaseIt: () => void,
}

const globalContextZustand = create<Props>((set) => ({
    normalVal: 10,
    increaseIt: () =>
        set((state) => ({ normalVal: state.normalVal + 10 })),
    decreaseIt: () =>
        set((state) => ({ normalVal: state.normalVal - 10 })),
}));

export default globalContextZustand;