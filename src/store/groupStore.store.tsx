import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GroupStore {
	groupId: string | null;
	setGroupId: (groupId: string) => void;
	clearGroupId: () => void;
}

export const useGroupStore = create<GroupStore>()(
	persist(
		(set) => ({
			groupId: null,
			setGroupId: (groupId) => set({ groupId }),
			clearGroupId: () => set({ groupId: null }),
		}),
		{
			name: "group-store",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
