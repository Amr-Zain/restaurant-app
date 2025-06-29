import { create } from 'zustand';
import { SelectedModifier } from './cart';



interface ItemDetailsState {
    quantity: number;
    selectedModifiers: SelectedModifier[];
    setQuantity: (quantity: number) => void;
    handleModifierChange: (
        subModifier: SubModifier,
        modifier: ItemModifier,
        action: "add" | "remove" | "select"
    ) => void;
    getModifierQuantity: (sub_modifier_id: number, item_modifier_id: number) => number;
    initializeModifiers: (subModifiers: SubModifier[]) => void; 

    resetItemDetails: () => void;
}



export const useItemDetailsStore = create<ItemDetailsState>((set, get) => ({
    quantity: 1,
    selectedModifiers: [],

    setQuantity: (newQuantity) => set({ quantity: newQuantity }),

    handleModifierChange: (subModifier, modifier, action) => {
        set((state) => {
            const prev = state.selectedModifiers;
            const existingIndex = prev.findIndex(
                (sm) =>
                    sm.sub_modifier_id === subModifier.id && sm.item_modifier_id === modifier.id,
            );

            if (subModifier.selections_type === "exact") {
                if (action === "select") {
                    return {
                        selectedModifiers: [
                            ...prev.filter((sm) => sm.sub_modifier_id !== subModifier.id),
                            {
                                sub_modifier_id: subModifier.id,
                                item_modifier_id: modifier.id,
                                quantity: 1,
                                name: modifier.name,
                                price: modifier.price?.price || 0,
                            },
                        ],
                    };
                }
            } else {
                if (action === "add") {
                    if (existingIndex > -1) {
                        const newSelected = [...prev];
                        newSelected[existingIndex].quantity += 1;
                        return { selectedModifiers: newSelected };
                    } else {
                        return {
                            selectedModifiers: [
                                ...prev,
                                {
                                    sub_modifier_id: subModifier.id,
                                    item_modifier_id: modifier.id,
                                    quantity: 1,
                                    name: modifier.name,
                                    price: modifier.price?.price || 0,
                                },
                            ],
                        };
                    }
                } else if (action === "remove" && existingIndex > -1) {
                    const newSelected = [...prev];
                    newSelected[existingIndex].quantity -= 1;
                    if (newSelected[existingIndex].quantity === 0) {
                        return {
                            selectedModifiers: newSelected.filter(
                                (_, index) => index !== existingIndex,
                            ),
                        };
                    }
                    return { selectedModifiers: newSelected };
                }
            }
            return { selectedModifiers: prev };
        });
    },
    getModifierQuantity: (sub_modifier_id, item_modifier_id) => {
        const selected = get().selectedModifiers.find(
            (sm) =>
                sm.sub_modifier_id === sub_modifier_id && sm.item_modifier_id === item_modifier_id,
        );
        return selected ? selected.quantity : 0;
    },
    initializeModifiers: (subModifiers) => {
        const { selectedModifiers, handleModifierChange } = get();
        subModifiers.forEach((subModifier) => {
            const hasSelection = selectedModifiers.some(
                (sm) => sm.sub_modifier_id === subModifier.id
            );
            if (!hasSelection) {
                if (subModifier.selections_type === "exact" && subModifier.item_modifiers.length > 0) {
                    handleModifierChange(subModifier, subModifier.item_modifiers[0], "select");
                } else if ((subModifier.min_num_of_selection || 0) > 0 && subModifier.item_modifiers.length > 0) {
                    handleModifierChange(subModifier, subModifier.item_modifiers[0], "add");
                }
            }
        });
    },

    resetItemDetails: () => set({ quantity: 1, selectedModifiers: [] }),
}));