import { getBranchs } from "@/services/ClientApiHandler";
import { create } from "zustand";
import Cookies from "js-cookie";

interface BranchStore {
    branchs: Branch[];
    isLoading: boolean;
    currentBranch: Branch | null
    setBranchs: (values: Branch[]) => void;
    setCurrentBranch: (values: Branch) => void;
    setLoading: (value: boolean) => void;
}
const branch = Cookies.get('store');
const inititals = {
    branchs: [],
    isLoading: false,
    currentBranch: branch && JSON.parse(branch) || null,
}
export const useBranchStore = create<BranchStore>((set) => ({
    ...inititals,
    setBranchs: (branchs) => set(() => ({ branchs })),
    setCurrentBranch: (currentBranch) => {
        Cookies.set('store', JSON.stringify(currentBranch), { expires: 7 })
        set(() => ({ currentBranch }))
    },
    setLoading: (isLoading) => set(() => ({ isLoading })),
}));

const getBranchsReq = async () => {
    try {
        if (useBranchStore.getState().branchs.length) return;
        useBranchStore.getState().setLoading(true);
        const fetchedBranches = await getBranchs();
        if (fetchedBranches && fetchedBranches.length) {
            useBranchStore.getState().setBranchs(fetchedBranches);
            if (!useBranchStore.getState().currentBranch) {
                useBranchStore.getState().setCurrentBranch(fetchedBranches[0]);
                Cookies.set('store', JSON.stringify(fetchedBranches[0]));
            }
        }
    } catch (error) {
        console.error("Failed to fetch branches:", error);
    } finally {
        useBranchStore.getState().setLoading(false);
    }
};
getBranchsReq();
