"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import profile from "@/assets/images/profile.png";
import { RadioGroup } from "../ui/radio-group";
import { useBranchStore } from "@/stores/branchs";
import { StoreRadioCard } from "../stores/StoreRadioCard";
import { StoresRadioSkeleton } from "../stores/StoresRadioSkeleton";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const Stores = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const { branchs, currentBranch, setCurrentBranch, isLoading } =
    useBranchStore((state) => state);
  const router = useRouter();

  const [tempSelectedBranchId, setTempSelectedBranchId] = useState<
    number | undefined
  >(currentBranch?.id);

  useEffect(() => {
    if (open) {
      setTempSelectedBranchId(currentBranch?.id);
    }
  }, [open, currentBranch]);

  const handleBranchChange = (branchId: string) => {
    setTempSelectedBranchId(+branchId);
  };

  const handleConfirm = () => {
    const selectedBranch = branchs.find(
      (branch) => branch.id === tempSelectedBranchId,
    );
    if (selectedBranch) {
      setCurrentBranch(selectedBranch);
      router.refresh();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <div className="flex items-center justify-center gap-2">
          <Image
            width={55}
            height={55}
            src={currentBranch?.image || profile}
            alt="Branch image"
            className="size-10 shrink-0 rounded-full object-cover"
          />
          <div className="text-sub hidden w-24 items-center gap-1 sm:flex">
            <div className="text-sm text-ellipsis">
              <h3 className="line-clamp-1">
                {currentBranch?.name ||
                  (isLoading ? "Loading..." : "No branch")}
              </h3>
              <p className="line-clamp-1">
                {currentBranch?.location_description ||
                  (isLoading ? "Loading..." : "No branch")}
              </p>
            </div>
            <span>
              <svg
                width="15"
                height="10"
                viewBox="0 0 10 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.665235 0.704804C0.665235 0.609804 0.700234 0.514804 0.775234 0.439804C0.920235 0.294804 1.16023 0.294804 1.30523 0.439804L4.56523 3.69981C4.80523 3.93981 5.19523 3.93981 5.43523 3.69981L8.69523 0.439805C8.84023 0.294805 9.08023 0.294805 9.22523 0.439805C9.37023 0.584805 9.37023 0.824805 9.22523 0.969805L5.96523 4.22981C5.71023 4.48481 5.36523 4.62981 5.00023 4.62981C4.63523 4.62981 4.29023 4.48981 4.03523 4.22981L0.775234 0.969804C0.705235 0.894804 0.665235 0.799804 0.665235 0.704804Z"
                  fill="#BDC1DF"
                />
              </svg>
            </span>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="bg-backgroud w-128 max-w-[90%] rounded-2xl border-0 px-4 shadow-xl [&>button:last-child]:hidden">
        <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute end-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none cursor-pointer">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl text-text text-center font-semibold">
            {t("labels.selectStore")}
          </DialogTitle>
        </DialogHeader>
        <div>
          <RadioGroup
            value={tempSelectedBranchId?.toString()}
            onValueChange={handleBranchChange}
            className="flex w-full flex-col gap-4"
          >
            {isLoading ? (
              <StoresRadioSkeleton length={3} />
            ) : branchs.length > 0 ? (
              branchs.map((branch) => (
                <StoreRadioCard
                  key={"branch " + branch.id}
                  branch={branch}
                  currentBranchId={tempSelectedBranchId}
                />
              ))
            ) : (
              <p className="text-sub text-center">{t("TEXT.noBranches")}</p>
            )}
          </RadioGroup>
          {branchs.length > 0 && (
            <Button
              className="mt-6 flex !h-10 !w-full justify-center"
              onClick={handleConfirm}
              disabled={!tempSelectedBranchId || isLoading}
            >
              {t("labels.confirm")}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Stores;
