import React from "react";

const BaseCard = ({
  title,
  children,
  className = "",
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`rounded-xl p-4  shadow-card-shadow   ${className}`}>
      <div className="flex items-center gap-2 flex-wrap justify-between">
        {title && (
          <h3
            className="text-5xl text-text font-semibold mb-3 animated wow zoomIn"
            data-wow-duration="1.3s"
            data-wow-delay="0s"
          >
            {title}
          </h3>
        )}
        {/* <slot name="topTitle"></slot> */}
      </div>
      {/* <slot name="title" /> */}
      {children}
    </div>
  );
};

export default BaseCard;

{
  /* <template>

</template>

<script setup>
defineProps({
  title: {
    required: false,
  },
});
</script>

 */
}
