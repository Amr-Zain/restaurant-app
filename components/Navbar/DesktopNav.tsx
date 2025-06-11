'use client'
import { Link } from "@/i18n/routing";
import Reservation from "./Reservations";

interface NavItem {
  value: string;
  path: string;
}

const DesktopNavigation = ({ items }: { items: NavItem[] }) => (
  <div className="hidden items-center gap-7 xl:flex">
    <ul className="flex items-center gap-4 overflow-x-auto">
      <li className="text-text hover:text-primary flex items-center gap-2 text-base transition-colors">
        <Reservation />
      </li>
      {items.map((item, i) => (
        <li key={item.path + i}>
          <Link
            href={item.path}
            className="text-text hover:text-primary text-sm font-light whitespace-nowrap transition-colors"
          >
            {item.value}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default DesktopNavigation;
