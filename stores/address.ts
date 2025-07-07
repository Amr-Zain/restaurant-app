import { create } from 'zustand';
import { deleteAddress, getAddress } from '@/services/ClientApiHandler';
import { toast } from 'sonner';


interface AddressStore {
    data: Address[];
    isLoading: boolean;
    error: string | null;
    isUpdate: boolean;
    updateId: number | null;
    setUpdate: ({ id, isUpdate }: { id: number | null, isUpdate?: boolean }) => void;
    setAdderss: (data: Address[]) => void;
    deleteFromAdderss: (id: number) => Promise<void>;
    addAddress: (address: Address) => void
    updateAddress: (address: Address) => void
    fetchAdderss: () => Promise<void>;
}

export const useAddressStore = create<AddressStore>((set, get) => ({
    data: [],
    isUpdate: false,
    updateId: null,
    isLoading: false,
    error: null,
    setUpdate: ({ id, isUpdate = true }) => set({ updateId: id, isUpdate }),
    setAdderss: (data) => set({ data }),
    updateAddress: (data) => {
        set(state => ({ data: state.data.map(item => item.id === data.id ? data : item) }))
    },
    addAddress: (address) => set(state => ({ data: [...state.data, address] })),
    deleteFromAdderss: async (id: number) => {
        const currentAdderss = get().data;
        let index = -1;
        const item = currentAdderss.find((item, i) => {
            if (item.id === id) {
                index = i;
                return true;
            }
            return false;
        })
        if (!item) {
            console.error(`Product with ID ${id} is not in favorites, cannot remove.`);
            return;
        }

        set((state) => ({
            data: state.data.filter((address) => address.id !== id),
        }));
        try {
            const res = await deleteAddress(id);
            if (res.status === 'success') {
                set((state) => ({
                    data: state.data.filter((address) => address.id !== id),
                    isLoading: false,
                }));
                toast.success(res.message || "Operation successful!");

            } else {
                set({ error: res.message || 'Failed to remove from favorites', isLoading: false });
            }
        } catch (err: unknown) {
            set(state => ({
                data: [
                    ...state.data.slice(0, index),
                    item,
                    ...state.data.slice(index)
                ],
                error: err instanceof Error ?err.message : 'Failed to remove from favorites', isLoading: false
            }));
            toast.error(err instanceof Error ?err.message : "Operation faild!");
        }
    },
    fetchAdderss: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await getAddress();
            set({ data: response.data, isLoading: false });
        } catch (err: unknown) {
            set({ error: err instanceof Error ?err.message : 'Failed to fetch favorites', isLoading: false });
        }
    },
}));