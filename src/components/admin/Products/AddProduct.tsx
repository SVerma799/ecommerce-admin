import { useTranslation } from "next-i18next";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

const AddProduct: FC = () => {
  const { t } = useTranslation(["Product"]);
  const form = useForm({
    defaultValues: {},
  });
  const { handleSubmit, formState } = useForm();

  const { errors } = formState;

  const onSubmit = () => {};

  return (
    <div>
      <h1 className="text-lg mb-5">{t("NewProduct")}</h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">{t("Name")}</label>
              <input
                type="text"
                name="name"
                id="name"
                className="border border-gray-300 rounded-md p-2"
              />
              {errors.name && (
                <span className="text-red-500">{t("Required")}</span>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProduct;
