import { create } from "zustand";

interface GroupStore {
	groupId: string | null;
	setGroupId: (groupId: string) => void;
}

export const useGroupStore = create<GroupStore>((set) => ({
	groupId: null,
	setGroupId: (groupId) => set({ groupId }),
}));
