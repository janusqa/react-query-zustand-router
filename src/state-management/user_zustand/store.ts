import { create } from 'zustand';
import { produce } from 'immer';

interface UserStore {
    user: string;
    login: (user: string) => void;
    logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: '',
    login: (user) =>
        set((state) => {
            const nextState = produce(state, (draft) => {
                draft.user = user;
            });
            return nextState;
        }),
    logout: () => set((state) => ({ user: '' })),
}));

export default useUserStore;
