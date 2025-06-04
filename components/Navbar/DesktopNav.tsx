import { Link } from "@/i18n/routing";

interface NavItem {
  value: string;
  path: string;
}

const DesktopNavigation = ({
  items,
}: {
  items: NavItem[];
}) => (
  <div className="hidden items-center gap-7 lg:flex">
    <ul className="flex list-none items-center gap-4 overflow-x-auto">
      {items.
      map((item,i) => (
        <li key={item.path +i}>
          <Link
            href={item.path}
            className="text-sm font-light whitespace-nowrap text-text transition-colors hover:text-primary"
          >
            {item.value}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default DesktopNavigation;
