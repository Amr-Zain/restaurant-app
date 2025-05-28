import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  to: string; // Selector to teleport to, e.g., "#modal-root"
};

const Teleport = ({ children, to }: PropsWithChildren<Props>) => {
  const [mounted, setMounted] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null); // Proper type

  useEffect(() => {
    const target = document.querySelector<HTMLElement>(to); // Properly typed querySelector
    setElement(target);
    setMounted(true);
  }, [to]);

  if (!mounted || !element) return null;

  return createPortal(children, element);
};

export default Teleport;
