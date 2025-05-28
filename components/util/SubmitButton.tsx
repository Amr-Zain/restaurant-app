import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function SubmitButton({ isPending, text, className }: { isPending: boolean, text: string, className?: string }) {
  return (
    <Button type="submit" className={className} disabled={isPending}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {text}
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export default SubmitButton;
