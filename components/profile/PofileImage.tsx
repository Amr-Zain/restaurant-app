'use client';
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import { updateProfileImage, updateUserProfile } from "@/services/ClientApiHandler";
import { toast } from "sonner";
import { profileFromType } from "@/helper/schema";
import { EditIcon, LoadingIcon } from "../Icons";

const ProfileImage = ({
  avatar,
}: {
  avatar: string;
}) => {
  const [preview, setPreview] = useState<string | null>(avatar);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setPreview(avatar);
  }, [avatar]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (!file) return; 

    setIsLoading(true); 
    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", "users");
    formData.append("attachment_type", "image");

    const url = URL.createObjectURL(file);
    
    try {
      const res = await updateProfileImage(formData);
      await updateUserProfile({avatar: res.data} as profileFromType)
      setPreview(url); 
      toast.success(res.message);
      
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Error uploading the image");
      setPreview(avatar);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="mx-auto !size-[280px] sm:!size-[350px] max-w-[100%] relative aspect-square">
        <Image
          src={preview || avatar}
          alt="Profile preview"
          width={350}
          height={350}
          className="rounded-full w-full h-full object-cover"
        />
        <label
          className={`absolute bottom-4 end-8 inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10 cursor-pointer ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {isLoading ? (
            <LoadingIcon />
          ) : (
           <EditIcon />
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isLoading} 
          />
        </label>
      </div>
    </div>
  );
};

export default ProfileImage;