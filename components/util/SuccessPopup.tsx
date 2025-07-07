"use client";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import success from "@/assets/images/success.gif";
import { Link } from "@/i18n/routing";
function SuccessPopup({
  open,
  setOpen,
  successLabel,
  successUrl,
  cancelLabel,
  cancelUrl,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  successLabel: string;
  successUrl: string;
  cancelLabel: string;
  cancelUrl: string;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent 
        className="bg-backgroud max-w-[95%] rounded-2xl border-0 px-4 shadow-xl "
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="mt-12 w-full">
          <Image
            src={success}
            width={150}
            height={150}
            alt="success icon"
            className="mx-auto"
          />
        </div>
        <h3 className="text-text text-center text-xl font-bold">Sussess</h3>
        <div className="w-full space-y-4">
          <Button
            onClick={async () => {
              setOpen(false);
            }}
            className="w-full cursor-pointer"
          >
            <Link href={successUrl} className="w-full">
              {successLabel}
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
            className="h-12 w-full cursor-pointer rounded-full"
          >
            <Link href={cancelUrl} className="w-full">
              {cancelLabel}
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessPopup;
