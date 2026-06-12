import { create } from "zustand";

interface UserInfo {
	userInfo: any;
	setUserInfo: (userInfo: any) => void;
}

export const userInfoStored = create<UserInfo>((set) => ({
	userInfo: null,
	setUserInfo: (userInfo) => set({ userInfo }),
}));
