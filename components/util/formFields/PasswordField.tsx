import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

function PasswordField<T extends FieldValues>({
  control,
  isLoading,
  placeholder,
  name
}: {
  control: Control<T>;
  isLoading?: boolean;
  placeholder:string;
  name: FieldPath<T>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className="pr-10"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 h-full cursor-pointer px-3 py-1 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PasswordField;
