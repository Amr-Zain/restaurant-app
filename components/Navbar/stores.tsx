"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import profile from "@/assets/images/profile.png";
import { RadioGroup } from "../ui/radio-group";
import { useBranchStore } from "@/stores/branchs";
import { StoreRadioCard } from "../stores/StoreRadioCard";
import { StoresRadioSkeleton } from "../stores/StoresRadioSkeleton";
import { useTranslations } from "next-intl";

const Stores = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const { branchs, currentBranch, setCurrentBranch, isLoading } =
    useBranchStore((state) => state);

  const handleBranchChange = (branchId: string) => {
    const selectedBranch = branchs.find(
      (branch) => branch.id.toString() === branchId,
    );
    if (selectedBranch) {
      setCurrentBranch(selectedBranch);
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
            className="size-10 rounded-full object-cover shrink-0"
          />
          <div className="text-sub hidden w-24 items-center gap-1 sm:flex">
            <div className=" text-sm text-ellipsis">
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

      <DialogContent className="bg-backgroud rounded-2xl w-128 max-w-[90%] border-0 px-4 shadow-xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-center  text-xl font-semibold text-text">
            {t("labels.selectStore")}
          </DialogTitle>
        </DialogHeader>
        <div>
          <RadioGroup
            value={currentBranch?.id?.toString() || ""}
            onValueChange={handleBranchChange}
            className="flex flex-col gap-4 w-full"
          >
            {isLoading ? (
              <StoresRadioSkeleton length={3} />
            ) : branchs.length > 0 ? (
              branchs.map((branch) => (
                <StoreRadioCard
                  key={"branch " + branch.id}
                  branch={branch}
                  currentBranchId={currentBranch?.id}
                />
              ))
            ) : (
              <p className="text-center text-sub">
                {t("TEXT.noBranches")}
              </p>
            )}
          </RadioGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Stores;
