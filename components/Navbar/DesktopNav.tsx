import { Link } from "@/i18n/routing";

const DesktopNavigation = ({
  items,
}: {
  items: Array<{ value: string; path: string }>;
  ariaLabel: string;
}) => (
  <div className="hidden items-center gap-7 md:flex">
    <ul className="flex list-none items-center gap-7">
      {items.
      map((item) => (
        <li key={item.path}>
          <Link
            href={item.path}
            className="text-sm font-light text-text transition-colors hover:text-gray-400"
          >
            {item.value}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default DesktopNavigation;