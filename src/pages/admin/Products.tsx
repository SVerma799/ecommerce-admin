import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Products() {
  const [collapsed, setSidebarCollapsed] = useState<boolean>(true);
  return (
    <div className="flex gap-2">
      <Navbar
        collapsed={collapsed}
        setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
      />
      <h1>Products</h1>
    </div>
  );
}
