import Navbar from "@/components/Navbar";
import AddCategory from "@/components/admin/Categories/AddCategory";
import { Button } from "@/components/form/button";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { useTranslation } from "next-i18next";

export default function Categories() {
  const [showAddCategories, setShowAddCategories] = useState<boolean>(false);
  const { t } = useTranslation(["Category"]);

  return (
    <div className="flex gap-2">
      <Navbar />
      <div className="w-full flex flex-col p-7">
        {showAddCategories ? (
          // {/* ********************************** Add Product Comp *********************** */}
          <AddCategory setShowAddCategories={setShowAddCategories} />
        ) : (
          // {/* ********************************** Add Product Comp *********************** */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Categories</h1>
            <Button
              buttonClass="w-fit"
              onClick={() => setShowAddCategories(true)}
            >
              {t("Add_Category")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "Category"])),
    },
  };
}
