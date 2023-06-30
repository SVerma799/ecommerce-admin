import { FC, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/form/button";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProductComp from "@/components/admin/Products/ProductComp";
import AddProduct from "@/components/admin/Products/AddProduct";
import { Product } from "../../../types/Product";

const Products: FC = () => {
  const { t } = useTranslation(["Product"]);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3003/api/admin/products/route").then((res) => {
      setProducts(res.data);
    });
  }, [setProducts]);

  const handleEditClick = (id: string) => {
    // console.log("Edit Clicked", id);
    alert(`Edit Clicked ${id}`);
  };

  const handleDeleteClick = (id: string) => {
    alert(`Delete Clicked ${id}`);
  };

  return (
    <div className="flex gap-2">
      <Navbar />
      <div className="w-full flex flex-col p-7">
        {/* ********************************** Add Product Comp *********************** */}
        {showAddProduct ? (
          <AddProduct setShowAddProduct={setShowAddProduct} />
        ) : (
          <>
            <h1 className="text-3xl">{t("Products")}</h1>
            <Button
              buttonClass="w-[20%] mt-5"
              onClick={() => setShowAddProduct(true)}
            >
              {t("Add_Products")}
            </Button>
            <div className="mt-5 flex flex-row flex-wrap gap-5">
              {products.map((product) => (
                <ProductComp
                  key={product._id}
                  {...product}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Products;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "Product"])),
    },
  };
}
