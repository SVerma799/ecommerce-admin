import { InputField, TextAreaField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/Select";
import { Button } from "@/components/form/button";
import { useTranslation } from "next-i18next";
import { FC, KeyboardEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";

const AddProduct: FC = () => {
  const { t } = useTranslation(["Product"]);
  const form = useForm({
    defaultValues: {},
  });
  const categories: string[] = ["Electronics", "Clothes", "Food"];

  const { handleSubmit } = useForm();
  const onSubmit = () => {};
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.which || event.keyCode;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /^[0-9]*$/; // Regular expression to match only numbers

    if (!regex.test(keyValue)) {
      event.preventDefault();
    }
  };
  return (
    <div>
      <h1 className="text-lg mb-5">{t("NewProduct")}</h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-center">
            <div className=" w-1/2 flex flex-col gap-6">
              <InputField
                label={t("Name")}
                labelClassName="text-md"
                rootClass="flex flex-col"
                name="Name"
                required
                placeholder={t("Name")}
              />
              <TextAreaField
                label={t("Description")}
                labelClassName="text-md"
                rootClass="flex flex-col"
                name="Description"
                required
                rows={5}
                cols={40}
                inputClass="resize-none"
                placeholder={t("Description")}
              />
              <InputField
                label={t("Price")}
                labelClassName="text-md"
                rootClass="flex flex-col"
                name="Price"
                required
                onKeyPress={handleKeyPress}
                maxLength={10}
                placeholder={t("Price")}
              />
            </div>
            <div className=" w-1/2 flex flex-col gap-6 h-full self-baseline">
              <SelectField
                label={t("Category")}
                labelClassName="text-md"
                infoText={t("CategoryInfo")}
                rootClass="flex flex-col gap-2"
                required
                inputClass=" focus:bg-gray-900"
                placeholder={t("Name")}
              >
                {categories &&
                  categories.map((category: string) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </SelectField>
            </div>
          </div>
          <Button buttonClass="w-[15%] self-end">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProduct;
