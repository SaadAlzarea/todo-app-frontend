import type { IAllGroupMember } from "@/domain/dtos/group/group.dto";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IGroupMemberStore {
	groupMember: IAllGroupMember[];
	setGroupMember: (groupMember: IAllGroupMember[]) => void;
}

export const useGroupMemberStore = create<IGroupMemberStore>()(
	persist(
		(set) => ({
			groupMember: [],
			setGroupMember: (groupMember) => set({ groupMember }),
		}),
		{
			name: "group-members",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
