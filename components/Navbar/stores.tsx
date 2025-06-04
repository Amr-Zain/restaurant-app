"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import profile from "@/assets/images/profile.png";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Card } from "../ui/card";
import { getBranchs } from "@/services/ClientApiHandler";
import { useBranchStore } from "@/stores/branchs";

const Stores = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const branchs = useBranchStore((state) => state.branchs);
  const setBranchs = useBranchStore((state) => state.setBranchs);
  const currentBranch = useBranchStore((state) => state.currentBranch);
  const setCurrentBranch = useBranchStore((state) => state.setCurrentBranch);

  useEffect(() => {
    const getBranchsReq = async () => {
      setLoading(true);
      try {
        if (!branchs.length || !currentBranch) {
          const fetchedBranches = await getBranchs();
          if (fetchedBranches && fetchedBranches.length) {
            setBranchs(fetchedBranches);
            if (!currentBranch) {
              setCurrentBranch(fetchedBranches[0]);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch branches:", error);
      } finally {
        setLoading(false);
      }
    };

    getBranchsReq();
  }, [setBranchs, setCurrentBranch, branchs.length, currentBranch]);

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
        <div>
          <div className="text-sub flex w-24 items-center gap-1">
            <div className="truncate text-sm !text-ellipsis">
              <h3>
                {currentBranch?.name ||
                  (loading ? "Loading..." : "No branch selected")}
              </h3>
              <p>
                {currentBranch?.location_description ||
                  (loading ? "Loading..." : "No branch selected")}
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

      <DialogContent className="bg-backgroud w-fit !min-w-[300px] rounded-2xl border-0 px-2 shadow-xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-center text-xl font-semibold text-gray-800">
            Select Store
          </DialogTitle>
        </DialogHeader>
        <div>
          <RadioGroup
            value={currentBranch?.id?.toString() || ""}
            onValueChange={handleBranchChange}
            className="flex flex-col gap-4"
          >
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="animate-pulse cursor-pointer py-2">
                  <div className="flex items-center justify-between gap-6 px-2">
                    <div className="flex items-center gap-2">
                      <div className="size-10 shrink-0 rounded-full bg-gray-200"></div>
                      <div className="grow-1 space-y-2">
                        <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                        <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                      </div>
                    </div>
                    <div className="size-5 rounded-full bg-gray-200"></div>
                  </div>
                </Card>
              ))
            ) : branchs.length > 0 ? (
              branchs.map((branch) => (
                <Card key={branch.id} className="cursor-pointer py-2">
                  <label
                    htmlFor={branch.id.toString()}
                    className="flex items-center justify-between gap-6 px-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="size-10 shrink-0">
                        <Image
                          src={branch.image || profile}
                          width={100}
                          height={100}
                          alt={(branch.name || "Abo shqra") + " logo"}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                      <div className="grow-1">
                        <h3 className="font-semibold">
                          {branch.name || "Abo shqra"}
                        </h3>
                        <p className="text-sub">
                          {branch.location_description ||
                            "No description available"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <RadioGroupItem
                        value={branch.id.toString()}
                        id={branch.id.toString()}
                      />
                    </div>
                  </label>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">No branches found.</p>
            )}
          </RadioGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Stores;
