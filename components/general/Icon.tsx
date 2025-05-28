import Image from "next/image";

export default function Icon({
  icon,
  size = 20,
}: {
  icon: string;
  size?: number;
}) {
  return (
    <span className="flex aspect-square size-[40px] items-center justify-center rounded-full bg-white/15 p-1 shadow-[0_0_43.3px_0_#006CDB66] lg:size-[45px]">
      <Image
        src={`/assets/icons/${icon}.svg`}
        width={size}
        height={size}
        alt={icon}
        draggable={false}
      />
    </span>
  );
}
