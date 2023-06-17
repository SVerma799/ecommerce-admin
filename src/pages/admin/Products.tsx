import { FC, useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/form/button";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AddProduct from "@/components/admin/Products/AddProduct";

const Products: FC = () => {
  const { t } = useTranslation("common");
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);
  return (
    <div className="flex gap-2">
      <Navbar />
      <div className="w-full flex flex-col p-7">
        <h1 className="text-3xl">{t("Products")}</h1>
        <Button
          buttonClass="w-[10%] mt-5"
          onClick={() => setShowAddProduct(true)}
        >
          {t("Add_Products")}
        </Button>

        {/* ********************************** Add Product Comp *********************** */}
        {showAddProduct && <AddProduct />}
        {/* ********************************** Add Product Comp *********************** */}
      </div>
    </div>
  );
};
export default Products;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
