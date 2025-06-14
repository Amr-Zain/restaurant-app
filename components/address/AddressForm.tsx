"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Field from "../util/formFields/FormField";
import GoogleMapComponent from "./GoogleMap";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { postAddress, updateAddress } from "@/services/ClientApiHandler";
import { useAddressStore } from "@/stores/address";

const addressSchema = z.object({
  title: z.string().min(1, "Title is required"),
  lat: z.string().min(1, "Location is required"),
  lng: z.string().min(1, "Location is required"),
  desc: z.string().min(1, "Description is required"),
  is_default: z.boolean().optional(),
  building: z.string().min(1, "Building number is required"),
  floor: z.string().min(1, "Floor number is required"),
  apartment: z.string().min(1, "Apartment number is required"),
});

export type AddressFormData = z.infer<typeof addressSchema>;

interface AddAddressFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAddressForm({
  isOpen,
  onClose,
}: AddAddressFormProps) {
  const {
    addAddress,
    isUpdate,
    updateId,
    data,
    updateAddress: setUpdated,
  } = useAddressStore((state) => state);
  const defaultValues = data.find((item) => item.id === updateId);
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      apartment: defaultValues?.apartment.toString(),
      building: defaultValues?.building.toString(),
      desc: defaultValues?.desc.toString(),
      floor: defaultValues?.floor.toString(),
      is_default: defaultValues?.is_default,
      lat: defaultValues?.lat.toString(),
      lng: defaultValues?.lng.toString(),
    },
  });
  const isSubmitting = form.formState.isLoading;

  const { handleSubmit } = useFormSubmission(form, {
    submitFunction: isUpdate
      ? (formData) => updateAddress(formData, updateId!)
      : postAddress,
    onSuccess: (res: SubmissionResult) => {
      if (isUpdate) setUpdated(res.data as Address);
      else addAddress(res?.data as Address);
      onClose();
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="mx-auto max-h-[90vh] max-w-md overflow-y-auto">
        <DialogHeader className="">
          <DialogTitle className="text-lg font-semibold">
            {isUpdate ? "Update Address" : "Add new address"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <fieldset disabled={isSubmitting} className="space-y-4">
                <Field
                  control={form.control}
                  placeholder="title"
                  name="title"
                  label="Title"
                  disabl
                />
                <Field
                  control={form.control}
                  placeholder="Description"
                  name="desc"
                  label="Description"
                  textarea
                  dis
                />
                <Field
                  control={form.control}
                  placeholder="Building"
                  name="building"
                  label="Building"
                  disabled={isSubmitting}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Field
                    control={form.control}
                    placeholder="Enter Your Floor No. Here"
                    name="floor"
                    label="Floor No."
                    disabled={isSubmitting}
                  />
                  <Field
                    control={form.control}
                    placeholder="Enter Your Apartment No. Here"
                    name="apartment"
                    label="Apartment No."
                    disabled={isSubmitting}
                  />
                </div>
                <Field
                  control={form.control}
                  placeholder="Enter Your Apartment No. Here"
                  name="is_default"
                  label="Set as default address"
                  checkbox
                  disabled={isSubmitting}
                />
                <GoogleMapComponent form={form} isOpen={isOpen} />
              </fieldset>
              <Button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
                disabled={
                  !form.watch("lat") || !form.watch("lng") || isSubmitting
                }
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
