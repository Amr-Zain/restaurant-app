import Image from "next/image";
import { Card, CardTitle } from "../ui/card";
import { Mail, Phone } from "lucide-react";
import { Location } from "../Icons";

function BranchCard({
  image,
  name,
  phone_code,
  phone,
  location_description,
  email,
}: Branch & { email?: string }) {
  return (
    <Card className="p-4">
      <div className="relative h-48 w-full overflow-hidden rounded-xl">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div>

      <CardTitle className="mt-4 text-lg">{name}</CardTitle>
      <div className="flex items-center gap-4">
        <div className="text-sub flex w-24 items-center gap-1 p-1 text-base font-semibold">
          <Phone className="size-4 font-normal" /> Phone
        </div>
        <div>{`(${phone_code}) ${phone}`}</div>
      </div>
      {email && (
        <div className="flex items-center gap-4">
          <div className="text-sub flex w-24 items-center gap-1 p-1 text-base font-semibold">
            <Mail className="size-4 font-normal" /> Email
          </div>
          <div>{email}</div>
        </div>
      )}
      <div className="flex items-center gap-4">
        <div className="text-sub flex w-24 items-center gap-1 p-1 text-base font-semibold">
          <Location className="size-4 font-normal" /> Location
        </div>
        <div>{location_description}</div>
      </div>
      </div>
    </Card>
  );
}

export default BranchCard;
