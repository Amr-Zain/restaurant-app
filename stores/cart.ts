
"use client";
import Cookies from "js-cookie";

import { addToCart, clearCart, deleteFromCart, getCart, updateCart } from "@/services/ClientApiHandler";
import { create } from "zustand";
import { toast } from "sonner";
import { appStore } from "./app";
import { useAuthStore } from "./auth";

export interface SelectedModifier {
  sub_modifier_id: number;
  item_modifier_id: number;
  quantity: number;
  price: number;
}

export interface CartItem {
  product_id: number;
  quantity: number;
  price: number;
  sub_modifiers: SelectedModifier[];
}

export interface CartState {
  items: CartProduct[];
  totalItems: number;
  price: PriceSummary | null;
  currency: string;
  isLoading: {
    fetchCartItems: boolean;
    addItem: boolean;
    itemId: number;
    removeItem: boolean;
    updateItemQuantity: boolean;
    clearCart: boolean;
  };
  error: string | null;
  fetchCartItems: (params?: Record<string, string>) => Promise<void>;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: (flag?:boolean) => Promise<void>;
  updateItemQuantity: (itemId: number, newQuantity: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalItems: 0,
  currency: '',
  price: null,
  isLoading: {
    fetchCartItems: false,
    addItem: false,
    itemId: 0,
    removeItem: false,
    updateItemQuantity: false,
    clearCart: false,
  },
  error: null,

  fetchCartItems: async (params) => {
    set((state) => ({ isLoading: { ...state.isLoading, fetchCartItems: true }, error: null }));
    try {
      const data = await getCart({ params });
      set({
        items: data.data?.products || [],
        price: data?.price || null,
        totalItems: data.data?.item_count || 0,
        currency: data?.currency || '',
      });
      appStore.getState().setPointsStatues({
        isPointsCovers: (data.price?.total || 0) <= (useAuthStore.getState()?.user?.points || 0),
        points: (useAuthStore.getState()?.user?.points || 0),
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch cart items.";
      console.error("Error fetching cart items:", err);
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set((state) => ({ isLoading: { ...state.isLoading, fetchCartItems: false } }));
    }
  },

  addItem: async (newItem) => {
    set((state) => ({ isLoading: { ...state.isLoading, addItem: true }, error: null }));
    try {
      const data = await addToCart({ ...newItem, store_id: 1 });
      toast.success(data.message || "Item added to cart successfully!");
      set({
        items: data.data.products,
        price: data.price,
        totalItems: data.data.item_count,
        currency: data.currency,
      });
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const errorMessage = err instanceof Error ? err.response.data.message : "Failed to add item to cart.";
      console.error("Error adding item to cart:", err);
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set((state) => ({ isLoading: { ...state.isLoading, addItem: false } }));
    }
  },

  removeItem: async (cart_product_id) => {
    set((state) => ({ isLoading: { ...state.isLoading, removeItem: true, itemId: cart_product_id }, error: null }));
    try {
      const itemToRemove = get().items.find((item) => item.id === cart_product_id);
      if (!itemToRemove) {
        toast.info("Item not found in cart.");
        return;
      }
      const data = await deleteFromCart(cart_product_id);
      toast.success(data.message || "Item removed from cart successfully!");
      const cart = {
        items: data.data.products,
        price: data.price,
        totalItems: data.data.item_count,
        currency: data.currency,
      }
      Cookies.set('cart', JSON.stringify(cart), { expires: 30 })
      appStore.getState().setPointsStatues({
        isPointsCovers: (data.price?.total || 0) <= (useAuthStore.getState()?.user?.points || 0),
        points: (useAuthStore.getState()?.user?.points || 0),
      });
      set(cart);
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const errorMessage = err instanceof Error ? err.response.data.message : "Failed to remove item from cart.";
      console.error("Error removing item from cart:", err);
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set((state) => ({ isLoading: { ...state.isLoading, removeItem: false, itemId: 0 } }));
    }
  },

  updateItemQuantity: async (cart_product_id, quantity) => {
    set((state) => ({ isLoading: { ...state.isLoading, updateItemQuantity: true, itemId: cart_product_id }, error: null }));
    try {
      const item = get().items.find((item) => item.id === cart_product_id);
      if (!item) {
        toast.info("Item not found in cart to update.");
        return;
      }
      const data = await updateCart({ cart_product_id, quantity });
      toast.success(data.message || "Cart item quantity updated successfully!");
      const cart = {
        items: data.data.products,
        price: data.price,
        totalItems: data.data.item_count,
        currency: data.currency,
      }
      Cookies.set('cart', JSON.stringify(cart), { expires: 30 })
      appStore.getState().setPointsStatues({
        isPointsCovers: (data.price?.total || 0) <= (useAuthStore.getState()?.user?.points || 0),
        points: (useAuthStore.getState()?.user?.points || 0),
      });
      set(cart);
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const errorMessage = err instanceof Error ? err.response.data.message : "Failed to update item quantity.";
      console.error("Error updating item quantity:", err);
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set((state) => ({ isLoading: { ...state.isLoading, updateItemQuantity: false, itemId: 0 } }));
    }
  },

  clearCart: async (flag) => {
    set((state) => ({ isLoading: { ...state.isLoading, clearCart: true }, error: null }));
    try {
      if(!flag){
        const data = await clearCart(); 
        toast.success(data.message || "Cart cleared successfully!");
      }
    const cart = {
        items: [], totalItems: 0, price: null,
      }
      Cookies.set('cart', JSON.stringify(cart), { expires: 30 })
      set(cart);
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const errorMessage = err instanceof Error ? err.response.data.message : "Failed to clear cart.";
      console.error("Error clearing cart:", err);
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set((state) => ({ isLoading: { ...state.isLoading, clearCart: false } }));
    }
  },
}));

useCartStore.getState().fetchCartItems();
