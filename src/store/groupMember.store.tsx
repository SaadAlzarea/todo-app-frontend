import type { IAllGroupMember } from "@/domain/dtos/group/group.dto";
import { create } from "zustand";

interface IGroupMemberStore {
	groupMember: IAllGroupMember[];
	setGroupMember: (groupMember: IAllGroupMember[]) => void;
}

export const useGroupMemberStore = create<IGroupMemberStore>((set) => ({
	groupMember: [],
	setGroupMember: (groupMember) => set({ groupMember }),
}));
