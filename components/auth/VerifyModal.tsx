"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import VerifyForm from "./VerifyForm";

export default function VerifyModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[450px] max-w-[90%]">
        <div className="grid gap-4 py-4">
          <VerifyForm isProfile onClose={() => setIsOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
