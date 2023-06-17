import InputField from "@/components/form/InputField";
import { useTranslation } from "next-i18next";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

const AddProduct: FC = () => {
  const { t } = useTranslation(["Product"]);
  const form = useForm({
    defaultValues: {},
  });
  const { handleSubmit } = useForm();
  const onSubmit = () => {};

  return (
    <div>
      <h1 className="text-lg mb-5">{t("NewProduct")}</h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <InputField
              label={t("Name")}
              labelClassName="text-md"
              rootClass="flex flex-col"
              name="name"
              required
              inputClass="border border-slate-950 bg-white focus:outline-indigo-800  p-2 mt-2 rounded"
              placeholder={t("Name")}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProduct;
