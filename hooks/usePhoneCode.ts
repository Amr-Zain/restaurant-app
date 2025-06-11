'use client';
import { getCodes } from "@/services/ClientApiHandler";
import { useEffect, useState } from "react";
import { FieldPath, FieldValues, PathValue, UseFormReturn } from "react-hook-form";

function usePhoneCode<T extends FieldValues>({
  form,
  setCurrentPhoneLimit,
}: {
  form: UseFormReturn<T>;
  setCurrentPhoneLimit: (value: number | null) => void;
}) {
  const [countries, setCountries] = useState<CountryCodeData[]>([]);

  const phoneCodeWatcher = form.watch("phone_code" as FieldPath<T>);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      const fetchedCodes: CountryCodeData[] = await getCodes();
      setCountries(fetchedCodes);
    };
    fetchCountryCodes();
  }, []);

  useEffect(() => {
    if (countries?.length > 0 && phoneCodeWatcher) {
      const selectedCountry = countries.find(
        (country) => country.phone_code === phoneCodeWatcher
      );

      if (selectedCountry) {
        setCurrentPhoneLimit(selectedCountry.phone_limit);
        //form.setValue("phone" as FieldPath<T>,"" as PathValue<T, FieldPath<T>>);
        form.trigger("phone" as FieldPath<T>);
      } else {
        setCurrentPhoneLimit(null);
        form.setValue("phone" as FieldPath<T>, "" as PathValue<T, FieldPath<T>>);
        form.trigger("phone" as FieldPath<T>);
      }
    }
  }, [phoneCodeWatcher, countries, form, setCurrentPhoneLimit]);

  return { countries };
}

export default usePhoneCode;