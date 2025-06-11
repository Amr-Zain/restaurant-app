'use client';
import Image from "next/image";
import { FieldValues, Path, useForm } from "react-hook-form";
import { ChangeEvent, useState, useEffect } from "react";
import { updateProfileImage } from "@/services/ClientApiHandler";
import { toast } from "sonner";

const ProfileImage = <TFormValues extends FieldValues>({
  form,
  avatar,
}: {
  form: ReturnType<typeof useForm<TFormValues>>;
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
    setPreview(url); 

    try {
      const res = await updateProfileImage(formData);
      form.setValue("avatar" as Path<TFormValues>, res.data);
      toast.success(res.message);

    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Error uploading the image");
      setPreview(avatar);
    } finally {
      setIsLoading(false);
      URL.revokeObjectURL(url);
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
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4993 18.9582H7.49935C2.97435 18.9582 1.04102 17.0248 1.04102 12.4998V7.49984C1.04102 2.97484 2.97435 1.0415 7.49935 1.0415H9.16602C9.50768 1.0415 9.79102 1.32484 9.79102 1.6665C9.79102 2.00817 9.50768 2.2915 9.16602 2.2915H7.49935C3.65768 2.2915 2.29102 3.65817 2.29102 7.49984V12.4998C2.29102 16.3415 3.65768 17.7082 7.49935 17.7082H12.4993C16.341 17.7082 17.7077 16.3415 17.7077 12.4998V10.8332C17.7077 10.4915 17.991 10.2082 18.3327 10.2082C18.6744 10.2082 18.9577 10.4915 18.9577 10.8332V12.4998C18.9577 17.0248 17.0243 18.9582 12.4993 18.9582Z"
                fill="white"
              />
              <path
                d="M7.08409 14.7415C6.57576 14.7415 6.10909 14.5581 5.76742 14.2248C5.35909 13.8165 5.18409 13.2248 5.27576 12.5998L5.63409 10.0915C5.70076 9.60814 6.01742 8.98314 6.35909 8.64147L12.9258 2.07481C14.5841 0.416471 16.2674 0.416471 17.9258 2.07481C18.8341 2.98314 19.2424 3.90814 19.1591 4.83314C19.0841 5.58314 18.6841 6.31647 17.9258 7.06647L11.3591 13.6331C11.0174 13.9748 10.3924 14.2915 9.90909 14.3581L7.40076 14.7165C7.29243 14.7415 7.18409 14.7415 7.08409 14.7415ZM13.8091 2.95814L7.24242 9.52481C7.08409 9.68314 6.90076 10.0498 6.86742 10.2665L6.50909 12.7748C6.47576 13.0165 6.52576 13.2165 6.65076 13.3415C6.77576 13.4665 6.97576 13.5165 7.21742 13.4831L9.72576 13.1248C9.94243 13.0915 10.3174 12.9081 10.4674 12.7498L17.0341 6.18314C17.5758 5.64147 17.8591 5.15814 17.9008 4.70814C17.9508 4.16647 17.6674 3.59147 17.0341 2.94981C15.7008 1.61647 14.7841 1.99147 13.8091 2.95814Z"
                fill="white"
              />
              <path
                d="M16.5423 8.19173C16.484 8.19173 16.4256 8.1834 16.3756 8.16673C14.1839 7.55006 12.4423 5.8084 11.8256 3.61673C11.7339 3.2834 11.9256 2.94173 12.259 2.84173C12.5923 2.75006 12.934 2.94173 13.0256 3.27506C13.5256 5.05006 14.9339 6.4584 16.709 6.9584C17.0423 7.05006 17.234 7.40006 17.1423 7.7334C17.0673 8.01673 16.8173 8.19173 16.5423 8.19173Z"
                fill="white"
              />
            </svg>
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