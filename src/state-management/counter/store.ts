import { create } from 'zustand';
import { produce } from 'immer';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface CounterStore {
    value: number;
    max: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
    value: 0,
    max: 5,
    increment: () =>
        set((state) => {
            const nextState = produce(state, (draft) => {
                draft.value++;
            });
            return nextState;
        }),
    decrement: () =>
        set((state) => {
            const nextState = produce(state, (draft) => {
                draft.value--;
            });
            return nextState;
        }),
    reset: () => set((state) => ({ max: 10 })),
}));

if (process.env.NODE_ENV === 'development')
    mountStoreDevtool('Counter Store', useCounterStore);

export default useCounterStore;
