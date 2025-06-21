import { create } from 'zustand';
import { getFavourites, taggleFavorit } from '@/services/ClientApiHandler';


interface FavoritesStore {
    data: Product[];
    isLoading: boolean;
    error: string | null;
    setFavorites: (data: Product[]) => void;
    deleteFromFavorites: (id: number) => Promise<void>;
    addToFavorites: (id: number) => Promise<void>;
    fetchFavorites: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
    data: [],
    isLoading: false,
    error: null,

    setFavorites: (data) => set({ data }),
    deleteFromFavorites: async (id: number) => {
        const currentFavorites = get().data;
        let index = -1;
        const item = currentFavorites.find((item, i) => {
            if (item.favourite_id === id) {
                index = i;
                return true;
            }
            return false;
        })
        if (!item) {
            console.log(`Product with ID ${id} is not in favorites, cannot remove.`);
            return;
        }

        set((state) => ({
            data: state.data.filter((product: Product) => product.favourite_id !== id),
        }));
    
        try {
            const res = await taggleFavorit({ favorit: false, id });

            if (res.status === 'success') {
                set((state) => ({
                    data: state.data.filter((product: Product) => product.id !== id),
                    isLoading: false,
                }));
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                set({ error: res.message || 'Failed to remove from favorites', isLoading: false });
            }
        } catch (err: unknown) {
            set(state => ({
                data: [
                    ...state.data.slice(0, index),
                    item,
                    ...state.data.slice(index)
                ],
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                error: err.message || 'Failed to remove from favorites', isLoading: false
            }));
        }
    },
    addToFavorites:async(id:number)=>{
        try{
            const item = await taggleFavorit({ favorit: true, id });
            set(state=>({data:[...state.data,item.data]}));
        }catch(err){
            console.log(err)
        }
    },
    fetchFavorites: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await getFavourites();
            set({ data: response.data, isLoading: false });
        } catch (err: unknown) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
            set({ error: err.message || 'Failed to fetch favorites', isLoading: false });
        }
    },
}));