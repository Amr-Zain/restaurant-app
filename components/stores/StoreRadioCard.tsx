import Image from "next/image";
import { Card } from "../ui/card";
import { RadioGroupItem } from "../ui/radio-group";
import profile from "@/assets/images/profile.png";

export const StoreRadioCard = ({branch, currentBranchId}:{branch:Branch,currentBranchId?:number}) => (
  <Card
    key={branch.id}
    className={`cursor-pointer py-2 !shadow-none ${branch.id === currentBranchId ? "border-primary border-1" : ""}`}
  >
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
          <h3 className="font-semibold">{branch.name || "Abo shqra"}</h3>
          <p className="text-sub">
            {branch.location_description || "No description available"}
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
);