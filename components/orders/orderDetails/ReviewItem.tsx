"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Star } from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { postProductReview } from "@/services/ClientApiHandler";
import { useRouter } from "@/i18n/routing";

function ReviewItem({
  id,
  orderId,
  name,
  image,
}: {
  id: number;
  orderId: string;
  name: string;
  image: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const t = useTranslations();
  const router = useRouter();
  const submitReviewHandler = async () => {
    try {
      setLoading(true);
      const res = await postProductReview(orderId, {
        order_item_id: id,
        rate,
        review,
      });
      if (res.status === "success") {
        setOpen(false);
        toast.success(res.message);
        router.refresh();
        setRate(0);
        setReview("");
      }
    } catch (error: unknown) {
      toast.error(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        error.response?.data?.message || t("reviewItem.errorSubmittingReview")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer self-end">
        <Button className={`!h-8 cursor-pointer gap-1 px-0 font-bold`}>
          {t("reviewItem.rate")} <Star className="fill-review text-review size-3" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background max-h-[90vh] rounded-2xl border-0 p-0 shadow-xl ">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-xl font-semibold">
            {t("reviewItem.addReview")}
          </DialogTitle>
        </DialogHeader>

        <div className="my-4 p-4 pt-0">
          <div className="overflow-y-auto pe-2" style={{ maxHeight: "calc(90vh - 150px)" }}>
            <div className="relative mb-4 h-[200px] w-full overflow-hidden rounded-lg">
              <Image
                src={image}
                alt="product image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            <p className="text-text mb-2 text-center text-lg font-semibold">
              {name}
            </p>
            <div className="mb-4 flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`size-6 cursor-pointer ${
                    star <= rate
                      ? "fill-review text-review"
                      : "fill-sub text-sub"
                  }`}
                  onClick={() => setRate(star)}
                />
              ))}
            </div>

            <p className="mb-2 text-sm text-gray-700">
              {t("reviewItem.doYouIntendToVisitAgain")}
            </p>

            <Textarea
              className="mb-4"
              rows={4}
              placeholder={t("reviewItem.typeYourReview")}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></Textarea>
          </div>
          <Button
            onClick={submitReviewHandler}
            className="!h-12 w-full cursor-pointer"
            disabled={loading || rate === 0 || review.trim() === ""}
          >
            {loading ? t("buttons.loading") : t("reviewItem.confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewItem;