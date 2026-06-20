"use client";

import { assets } from "@/public/assets/asset";
import { saveAddressDB } from "@/utils/actions/address.action";
import { addressValidationSchema } from "@/utils/zodvalidation/form-validation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

type AddressFieldName =
  | "region"
  | "title"
  | "address"
  | "state"
  | "city"
  | "phone";

type AddressFormValues = Record<AddressFieldName, string> & {
  isDefault: boolean;
};

type AddressFieldErrors = Partial<Record<AddressFieldName, string>>;

const initialValues: AddressFormValues = {
  region: "Nigeria",
  title: "",
  address: "",
  state: "",
  city: "",
  phone: "",
  isDefault: false,
};

interface NewAddressProps {
  triggerVariant?: "button" | "card";
  triggerLabel?: string;
}

function NewAddress({
  triggerVariant = "button",
  triggerLabel = "Add new address",
}: NewAddressProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [formValues, setFormValues] =
    useState<AddressFormValues>(initialValues);
  const [errors, setErrors] = useState<AddressFieldErrors>({});

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    setErrors({});
  };

  const resetForm = () => {
    setFormValues(initialValues);
    setErrors({});
  };

  const handleFieldChange =
    (field: AddressFieldName) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((current) => ({
        ...current,
        [field]: event.target.value,
      }));

      if (errors[field]) {
        setErrors((current) => ({
          ...current,
          [field]: undefined,
        }));
      }
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validatedFields = addressValidationSchema.safeParse({
      region: formValues.region,
      title: formValues.title,
      address: formValues.address,
      state: formValues.state,
      city: formValues.city,
      phone: formValues.phone,
    });

    if (!validatedFields.success) {
      const nextErrors: AddressFieldErrors = {};

      for (const [field, messages] of Object.entries(
        validatedFields.error.flatten().fieldErrors,
      )) {
        if (messages?.[0]) {
          nextErrors[field as AddressFieldName] = messages[0];
        }
      }

      setErrors(nextErrors);
      return;
    }

    startTransition(async () => {
      const result = await saveAddressDB({
        ...validatedFields.data,
        isDefault: formValues.isDefault,
      });

      if (!result?.success) {
        toast.error("Could not save address");
        return;
      }

      toast.success("Address added");
      resetForm();
      closeModal();
      router.refresh();
    });
  };

  const renderTrigger = () => {
    if (triggerVariant === "card") {
      return (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex  w-full flex-col items-center justify-center rounded-[12px] p-6 text-center text-primary transition-colors "
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-primary">
            <Image
              src={assets.plusIcon}
              width={28}
              height={28}
              alt="Add address"
            />
          </div>
          <p className="mt-4 text-lg font-semibold">{triggerLabel}</p>
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
      >
        {triggerLabel}
      </button>
    );
  };

  return (
    <>
      {renderTrigger()}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close address modal"
            className="absolute inset-0 bg-[#03081f]/55 backdrop-blur-[2px]"
            onClick={closeModal}
          />

          <div className="relative z-10 w-full max-w-2xl rounded-[12px] bg-white p-6 shadow-[0_30px_90px_rgba(3,8,31,0.18)] transition-transform duration-300 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="mt-2 text-3xl font-extrabold text-banner">
                  Add a new address
                </h2>
                <p className="mt-2 text-sm text-foreground/60">
                  Save a delivery address and set it as default if needed.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-banner border border-banner/10 transition-colors hover:border-primary/30 "
              >
                <Image src={assets.close} width={16} height={16} alt="Close" />
              </button>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Region"
                  name="region"
                  value={formValues.region}
                  onChange={handleFieldChange("region")}
                  error={errors.region}
                />
                <FormField
                  label="Title"
                  name="title"
                  value={formValues.title}
                  onChange={handleFieldChange("title")}
                  placeholder="Home, Office"
                  error={errors.title}
                />
                <FormField
                  label="State"
                  name="state"
                  value={formValues.state}
                  onChange={handleFieldChange("state")}
                  error={errors.state}
                />
                <FormField
                  label="City"
                  name="city"
                  value={formValues.city}
                  onChange={handleFieldChange("city")}
                  error={errors.city}
                />
                <FormField
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formValues.phone}
                  onChange={handleFieldChange("phone")}
                  placeholder="08012345678"
                  error={errors.phone}
                />
              </div>

              <FormField
                label="Address"
                name="address"
                value={formValues.address}
                onChange={handleFieldChange("address")}
                placeholder="Street, area, nearby landmark"
                error={errors.address}
                multiline
              />

              <label className="flex items-center gap-3 px-4 py-4 text-sm text-banner">
                <input
                  type="checkbox"
                  checked={formValues.isDefault}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      isDefault: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-primary"
                />
                Set this address as my default
              </label>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-12 rounded-full border border-banner/12 px-6 text-sm font-semibold text-banner transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="h-12 rounded-full bg-primary px-7 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPending ? "Saving..." : "Save address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
  placeholder?: string;
  multiline?: boolean;
  type?: string;
}

function FormField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  multiline = false,
  type = "text",
}: FormFieldProps) {
  const sharedClassName =
    "h-14 w-full rounded-[12px] border border-banner/12  px-5 text-base text-banner outline-none transition-colors placeholder:text-foreground/30 focus:border-primary";

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-banner">
        {label}
      </span>

      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          placeholder={placeholder}
          className="w-full rounded-[12px] border border-banner/12  px-5 py-4 text-base text-banner outline-none transition-colors placeholder:text-foreground/30 focus:border-primary"
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={sharedClassName}
        />
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </label>
  );
}

export default NewAddress;
