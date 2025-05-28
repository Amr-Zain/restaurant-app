import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogComponent({
  triggle,
  title,
  desc,
  children,
  isOpen,
  setIsOpen,
}: {
  triggle: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  desc?: string;
  isOpen:boolean, setIsOpen:(show:boolean)=>void
}) {

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{triggle}</DialogTrigger>
      <DialogContent className="p-0 rounded-3xl my-auto !w-[80%] !max-w-none h-[80%]">
        {title&&<DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>}
        {children}
      </DialogContent>
    </Dialog>
  );
}
