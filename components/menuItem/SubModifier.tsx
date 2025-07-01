"use client";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useItemDetailsStore } from "@/stores/itemDitails";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

function SubModifierComponent({ subModifier }: { subModifier: SubModifier }) {
  const handleModifierChange = useItemDetailsStore(
    (state) => state.handleModifierChange,
  );
  const t = useTranslations();
  const getModifierQuantity = useItemDetailsStore(
    (state) => state.getModifierQuantity,
  );
  const selectedModifiers = useItemDetailsStore(
    (state) => state.selectedModifiers,
  );
  const initializeModifiers = useItemDetailsStore(
    (state) => state.initializeModifiers,
  );
  useEffect(() => {
    initializeModifiers([subModifier]);
  }, [subModifier, initializeModifiers]);
  const dir = t('lang')
  return (
    <div
      key={subModifier.id}
      className={`${subModifier.selections_type === "exact" ? "lg:col-span-2" : ""}`}
    >
      <h3 className="text-text mb-3 text-lg font-semibold">
        {subModifier.name}
        {
          <span className="text-review ms-2 text-sm">
            {t("labels.selectTopping", {
              type: t(`labels.${subModifier.selections_type}`),
              value:
                subModifier.selections_type === "exact"
                  ? `${subModifier.max_num_of_selection} ${subModifier.name}`
                  : `${subModifier.min_num_of_selection || 0}~${subModifier.max_num_of_selection} ${subModifier.name}`,
            })}
          </span>
        }
      </h3>
      {subModifier.selections_type === "exact" ? (
        <RadioGroup
          value={
            selectedModifiers
              .find((sm) => sm.sub_modifier_id === subModifier.id)
              ?.item_modifier_id.toString() || ""
          }
          onValueChange={(value) => {
            const modifier = subModifier.item_modifiers.find(
              (m) => m.id.toString() === value,
            );
            if (modifier) {
              handleModifierChange(subModifier, modifier, "select");
            }
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dir={dir as any }
          className="flex flex-col gap-4 sm:flex-row"
        >
          {subModifier.item_modifiers.map((modifier) => {
            const isSelected =
              selectedModifiers.find(
                (sm) =>
                  sm.sub_modifier_id === subModifier.id &&
                  sm.item_modifier_id === modifier.id,
              ) !== undefined;

            return (
              <div
                key={modifier.id}
                className={cn(
                  "checkout-input",
                  
                  isSelected ? "border-primary border" : "",
                )}
              >
                <RadioGroupItem
                  value={modifier.id.toString()}
                  id={modifier.id.toString()}
                  className="hidden"
                />
                <Label
                  htmlFor={modifier.id.toString()}
                  className="text-text cursor-pointer text-sm font-semibold"
                >
                  {modifier.name}
                  {modifier.price &&
                    ` (+${modifier.price.price} ${modifier.price.currency})`}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      ) : (
        <div className="max-h-[210px] space-y-2 overflow-y-auto">
          {subModifier.item_modifiers.map((modifier) => {
            const modifierQuantity = getModifierQuantity(
              subModifier.id,
              modifier.id,
            );
            const isSelected = modifierQuantity > 0;
            const currentSelectionsCount = selectedModifiers.reduce(
              (count, sm) => {
                if (sm.sub_modifier_id === subModifier.id) {
                  return count + sm.quantity;
                }
                return count;
              },
              0,
            );
            const isMax = !!(
              subModifier.max_num_of_selection &&
              currentSelectionsCount >= subModifier.max_num_of_selection
            );
            return (
              <div
                key={modifier.id}
                className={cn(
                  "checkout-input me-2",
                  'p-2 sm:p-4',
                  isSelected ? "border-primary border" : "",
                )}
              >
                <div className="text-text flex flex-col font-medium">
                  <div>
                    <span className="font-semibold text-sm">{modifier.name}</span>
                    <span className="text-sm font-medium">
                      {modifier.price
                        ? ` (+${modifier.price.price} ${modifier.price.currency})`
                        : ` (free)`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center sm:space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleModifierChange(subModifier, modifier, "remove")
                    }
                    disabled={modifierQuantity === 0}
                    className="size-8 cursor-pointer rounded-sm"
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-6 text-center p-2 font-semibold text-gray-800">
                    {modifierQuantity}
                  </span>
                  <Button
                    variant="default"
                    size="icon"
                    disabled={isMax}
                    onClick={() =>
                      handleModifierChange(subModifier, modifier, "add")
                    }
                    className="size-8 !h-8 cursor-pointer rounded-sm"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SubModifierComponent;
