import Item from "../menuItem/Item";
import SubModifierComponent from "../menuItem/SubModifier";
import ItemCardButtons from "../menuItem/ItemsCartButtons";

import { FadeIn } from "@/components/animations"; // Adjust path as necessary
// import { ScaleIn } from "@/components/animations/ScaleIn"; // Not directly used in this animation plan

export default function ItemDetails({
  productData,
}: {
  productData: ProductData; // Assuming ProductData type is defined elsewhere
}) {
  return (
    <FadeIn direction="up" delay={0.1} duration={0.8} className="container mx-auto p-4 sm:p-6 lg:p-8">
      <FadeIn direction="up" delay={0.2} duration={0.7}>
        <Item
          favourite_id={productData.favourite_id}
          review_count={productData.review_count}
          rating={productData.rating}
          name={productData.name}
          isFavorit={productData.is_favourite}
          id={productData.id}
          imageUrl={productData.image}
          description={productData.desc}
          icon={productData.food_icon[0]}
        />
      </FadeIn>
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
        {productData?.sub_modifiers
          .map((subModifier) => (
              <SubModifierComponent
              key={'submodifier '+subModifier.id}
                subModifier={subModifier}
              />
          ))}
      </div>

      <FadeIn direction="up" delay={0.5 + productData.sub_modifiers.length * 0.1} duration={0.7}>
        <ItemCardButtons
          currency={productData.price.currency}
          id={productData.id}
          price={productData.price.price}
        />
      </FadeIn>
    </FadeIn>
  );
}