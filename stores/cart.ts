"use client";

import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedToppings: { name: string; price: number | null; quantity: number }[];
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  updateItemQuantity: (itemId: string, newQuantity: number) => void;
  updateToppingQuantity: (
    itemId: string,
    itemSize: string | null,
    itemToppings: { name: string; price: number | null; quantity: number }[],
    toppingName: string,
    newToppingQuantity: number,
  ) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addItem: (newItem) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id,
      );

      if (existingItemIndex > -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
        return {
          items: updatedItems,
          totalItems: state.totalItems + newItem.quantity,
          totalPrice:
            state.totalPrice +
            newItem.price * newItem.quantity +
            newItem.selectedToppings.reduce(
              (acc, curr) => acc + (curr.price || 0) * curr.quantity,
              0,
            ) *
              newItem.quantity,
        };
      } else {
        return {
          items: [...state.items, newItem],
          totalItems: state.totalItems + newItem.quantity,
          totalPrice:
            state.totalPrice +
            newItem.price * newItem.quantity +
            newItem.selectedToppings.reduce(
              (acc, curr) => acc + (curr.price || 0) * curr.quantity,
              0,
            ) *
              newItem.quantity,
        };
      }
    });
  },

  removeItem: (itemId) => {
    set((state) => {
      const itemToRemove = state.items.find((item) => item.id === itemId);
      if (!itemToRemove) return state;

      const updatedItems = state.items.filter((item) => item.id !== itemId);
      return {
        items: updatedItems,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice:
          state.totalPrice -
          itemToRemove.price * itemToRemove.quantity -
          itemToRemove.selectedToppings.reduce(
            (acc, curr) => acc + (curr.price || 0) * curr.quantity,
            0,
          ) *
            itemToRemove.quantity,
      };
    });
  },

  updateItemQuantity: (itemId, newQuantity) => {
    set((state) => {

      const updatedItems = state.items
        .map((item) => {
          if (item.id === itemId) {            
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0); 

      const newTotalItems = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      const newTotalPrice = updatedItems.reduce(
        (sum, item) =>
          sum +
          item.price * item.quantity +
          item.selectedToppings.reduce(
            (acc, curr) => acc + (curr.price || 0) * curr.quantity,
            0,
          ) *
            item.quantity,
        0,
      );

      return {
        items: updatedItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
      };
    });
  },

  updateToppingQuantity: (
    itemId,
    itemSize,
    itemToppings,
    toppingName,
    newToppingQuantity,
  ) => {
    set((state) => {
      let priceChange = 0;

      const updatedItems = state.items.map((cartItem) => {
        if (cartItem.id === itemId) {
          let toppingFound = false;
          const updatedToppings = cartItem.selectedToppings
            .map((topping) => {
              if (topping.name === toppingName) {
                toppingFound = true;
                const oldToppingQuantity = topping.quantity;
                const actualNewToppingQuantity = Math.max(
                  0,
                  newToppingQuantity,
                ); 

                priceChange +=
                  (topping.price || 0) *
                  (actualNewToppingQuantity - oldToppingQuantity) *
                  cartItem.quantity;

                return { ...topping, quantity: actualNewToppingQuantity };
              }
              return topping;
            })
            .filter((topping) => topping.quantity > 0);

          if (!toppingFound && newToppingQuantity > 0) {
            const newToppingPrice =
              itemToppings.find((t) => t.name === toppingName)?.price || 0;
            priceChange +=
              newToppingPrice * newToppingQuantity * cartItem.quantity;
            updatedToppings.push({
              name: toppingName,
              price: newToppingPrice,
              quantity: newToppingQuantity,
            });
          }

          return { ...cartItem, selectedToppings: updatedToppings };
        }
        return cartItem;
      });

      const newTotalPrice = state.totalPrice + priceChange;

      return {
        items: updatedItems,
        totalPrice: newTotalPrice,
      };
    });
  },

  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}));
