import Item from "../menuItem/Item";
import SubModifierComponent from "../menuItem/SubModifier";
import ItemCardButtons from "../menuItem/ItemsCartButtons";

export default function ItemDetails({
  productData,
}: {
  productData: ProductData;
}) {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Item
        favourite_id={productData.favourite_id}
        review_count={productData.review_count}
        rating={productData.rating}
        name={productData.name}
        isFavorit={productData.is_favourite}
        id={productData.id}
        imageUrl={productData.image}
        description={productData.desc}
      />

      {productData?.sub_modifiers.map((subModifier) => (
        <SubModifierComponent
          key={` submidifier ${subModifier.id}`}
          subModifier={subModifier}
        />
      ))}
      <ItemCardButtons
        currency={productData.price.currency}
        id={productData.id}
        price={productData.price.price}
      />
    </div>
  );
}
