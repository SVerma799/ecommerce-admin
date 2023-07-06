import { InputField, TextAreaField } from "@/components/form/InputField";
import axios from "axios";
import { Button } from "@/components/form/button";
import React, { FC, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Category } from "../../../../types/Category";

interface AddCategoryProps {
  setShowAddCategories: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCategory: FC<AddCategoryProps> = ({ setShowAddCategories }) => {
  const { t } = useTranslation(["Category"]);

  const [categoryFormState, setCategoryFormState] = useState<Category>({
    title: "",
    description: "",
  } as Category);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { handleSubmit, register } = form;

  const onSubmit = async () => {
    await axios.post("/api/admin/category/route", categoryFormState);
    // Reset form
    form.reset();

    // Reset product form state
    setCategoryFormState({} as Category);

    // Show success message
    alert("Category added successfully");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Add Category</h1>
        <Button
          buttonClass=" bg-red-800 hover:border-red-800"
          onClick={() => setShowAddCategories(false)}
        >
          {t("cancel")}
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <FormProvider {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-row gap-4 items-center">
                <div className=" w-1/2 flex flex-col gap-6">
                  <InputField
                    label={t("title")}
                    labelClassName="text-md"
                    rootClass="flex flex-col"
                    name="title"
                    required
                    ref={register({ required: true })}
                    placeholder={t("Name")}
                    value={categoryFormState.title}
                    onChange={(e: any) => {
                      setCategoryFormState({
                        ...categoryFormState,
                        [e.target.name]: e.target.value.trim(),
                      });
                    }}
                  />
                  <TextAreaField
                    label={t("Description")}
                    labelClassName="text-md"
                    rootClass="flex flex-col"
                    name="description"
                    rows={5}
                    cols={40}
                    required
                    ref={register({ required: true })}
                    inputClass="resize-none"
                    placeholder={t("Description")}
                    value={categoryFormState.description}
                    onChange={(e: any) =>
                      setCategoryFormState({
                        ...categoryFormState,
                        [e.target.name]: e.target.value.trim(),
                      })
                    }
                  />
                </div>
              </div>
              <Button buttonClass="w-[15%] self-end">{t("Submit")}</Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
