import { create } from "zustand";

interface BranchStore {
    branchs: Branch[];
    currentBranch: Branch | null
    setBranchs: (values: Branch[]) => void;
    setCurrentBranch: (values: Branch) => void;
}

const inititals = {
    branchs:[],
    currentBranch: null,
    token: localStorage.getItem('token'),
}
export const useBranchStore = create<BranchStore>((set) => ({
    ...inititals,
    setBranchs: (branchs) => set(() =>( {branchs})),
    setCurrentBranch: (currentBranch)=>set(()=>({currentBranch}))
})); 