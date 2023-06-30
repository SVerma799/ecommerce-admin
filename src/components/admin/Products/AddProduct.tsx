import {
  ImageField,
  InputField,
  TextAreaField,
} from "@/components/form/InputField";
import { SelectField } from "@/components/form/Select";
import axios from "axios";
import { Button } from "@/components/form/button";
import { useTranslation } from "next-i18next";
import { FC, KeyboardEvent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Product } from "../../../../types/Product";
import { Category } from "../../../../types/Category";

/**
 * Add product component
 *
 * @return {*}
 */
const AddProduct: FC = () => {
  const { t } = useTranslation(["Product"]);
  const [productformState, setProductFormState] = useState<Product>(
    {} as Product
  );

  const [categories, setCategories] = useState<Category[]>([] as Category[]);

  // *************** HOOKS AREA STARTS HERE *****************
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get("/api/admin/category/route");
      setCategories(data);
    };
    fetchCategories();
  }, [setCategories]);

  // *************** HOOKS ARAE ENDS HERE *******************

  /**
   * Handle file change
   * Very expensive operation
   * rather store the image in the Amazon S3 bucket and store the url in the database
   * making a small project so doing it like this.
   * @param {*} e
   */
  const onFileChange = (e: any) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const binaryData = readerEvent.target?.result;

      if (binaryData && typeof binaryData === "string") {
        setProductFormState({
          ...productformState,
          image: binaryData,
        });
      }
    };
    reader.readAsBinaryString(e.target.files[0]);
  };

  /** @type {*} */
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
    },
  });

  /** @type {*} */
  const { handleSubmit, register } = form;

  /**
   * Handle form submit
   *
   */
  const onSubmit = async () => {
    await axios.post("/api/admin/products/route", productformState);

    // Reset form
    form.reset();

    // Reset product form state
    setProductFormState({} as Product);

    // Show success message
    alert("Product added successfully");
  };

  /**
   * Handle key press event for a number input
   *
   * @param {KeyboardEvent<HTMLInputElement>} event
   */
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
                name="name"
                required
                ref={register({ required: true })}
                placeholder={t("Name")}
                value={productformState.name}
                onChange={(e: any) => {
                  setProductFormState({
                    ...productformState,
                    name: e.target.value,
                  });
                }}
                defaultValue={productformState.name}
              />
              <TextAreaField
                label={t("Description")}
                labelClassName="text-md"
                rootClass="flex flex-col"
                name="description"
                required
                rows={5}
                cols={40}
                ref={register({ required: true })}
                inputClass="resize-none"
                placeholder={t("Description")}
                value={productformState.description}
                onChange={(e: any) =>
                  setProductFormState({
                    ...productformState,
                    description: e.target.value,
                  })
                }
                defaultValue={productformState.description}
              />
              <InputField
                label={t("Price")}
                labelClassName="text-md"
                rootClass="flex flex-col"
                name="price"
                required
                onKeyPress={handleKeyPress}
                maxLength={10}
                ref={register({ required: true })}
                placeholder={t("Price")}
                value={productformState.price}
                onChange={(e: any) =>
                  setProductFormState({
                    ...productformState,
                    price: e.target.value,
                  })
                }
                defaultValue={productformState.price}
              />
            </div>
            <div className=" w-1/2 flex flex-col gap-6 h-full self-baseline">
              <SelectField
                label={t("Category")}
                labelClassName="text-md"
                infoText={t("CategoryInfo")}
                rootClass="flex flex-col gap-2"
                required
                inputClass="dark:focus:bg-gray-900"
                placeholder={t("Name")}
                onChange={(e: any) =>
                  setProductFormState({
                    ...productformState,
                    category: e.target.value,
                  })
                }
              >
                {categories &&
                  categories.map((category: Category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
              </SelectField>
              <ImageField
                label={t("Image")}
                labelClassName="text-md"
                rootClass="flex flex-col"
                name="image"
                required
                placeholder={t("Name")}
                onChange={(e: any) => onFileChange(e)}
              />
            </div>
          </div>
          <Button buttonClass="w-[15%] self-end">{t("Submit")}</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProduct;
