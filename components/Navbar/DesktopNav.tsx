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
      <li className="nav-item">
        <Reservation />
      </li>
      {items.map((item, i) => (
        <li key={item.path + i}>
          <Link
            href={item.path}
            className="nav-item"
          >
            {item.value}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default DesktopNavigation;
