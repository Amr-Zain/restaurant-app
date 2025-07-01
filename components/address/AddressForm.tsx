"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Field from "../util/formFields/FormField";
import GoogleMapComponent from "./GoogleMap";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { postAddress, updateAddress } from "@/services/ClientApiHandler";
import { useAddressStore } from "@/stores/address";
import { addressSchema, AddressSchemaType } from "@/helper/schema";
import { useTranslations } from "next-intl";


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
  const defaultValues = isUpdate
    ? data.find((item) => item.id == updateId)
    : undefined;
  const t = useTranslations();
  console.log(defaultValues)
  const form = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema({t})),
    
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
useEffect(() => {
    if (isOpen && isUpdate && defaultValues) {
      form.reset({
        apartment: defaultValues.apartment || "",
        building: defaultValues.building || "",
        desc: defaultValues.desc || "",
        floor: defaultValues.floor || "",
        is_default: defaultValues.is_default || false,
        lat: defaultValues.lat || '0',
        lng: defaultValues.lng || '0',
        title: defaultValues.title || "", 
      });
    } else if (isOpen && !isUpdate) {
        form.reset({
            apartment: "",
            building: "",
            desc: "",
            floor: "",
            is_default: false,
            title: "",
        });
    }
  }, [isOpen, isUpdate, defaultValues, form]);
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="mx-auto max-h-[90vh] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {isUpdate ? "Update Address" : "Add new address"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[75vh] px-2 overflow-y-auto">
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
                className="w-full rounded-lg bg-primary py-3 font-medium text-white cursor-pointer"
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
