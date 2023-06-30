import { FC } from "react";
// import Link from "next/link";
import { Button } from "@/components/form/button";
import { Product } from "../../../../types/Product";

interface ProductCompProps extends Product {
  handleEditClick: (id: string) => void;
  handleDeleteClick: (id: string) => void;
}

const ProductComp: FC<ProductCompProps> = ({
  handleEditClick,
  handleDeleteClick,
  ...products
}) => (
  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-950 dark:border-gray-700 p-4 dark:hover:bg-gradient-to-t dark:hover:from-indigo-800 dark:hover:to-black">
    {/* <Link>
    <Image
      className="p-8 rounded-t-lg"
      src="/docs/images/products/apple-watch.png"
      alt="product image"
    />
  </Link> */}
    <div>
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {products.name}
      </h5>
      <div className="flex items-center mt-2.5 mb-5">
        <p className="font-semibold tracking-tight text-gray-900 dark:text-white">
          {products.description}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          ${products.price}
        </span>
        {/* <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Edit
      </button>{" "} */}
        <div className="flex gap-4">
          <Button onClick={() => handleEditClick(products._id)}>Edit</Button>
          <Button
            buttonClass=" bg-red-800 hover:border-red-800"
            onClick={() => handleDeleteClick(products._id)}
          >
            Delete
          </Button>
        </div>
        {/* <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Delete
      </button> */}
      </div>
    </div>
  </div>
);

export default ProductComp;
