import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Dashboard() {
  const [collapsed, setSidebarCollapsed] = useState<boolean>(true);
  return (
    <div className="flex gap-2">
      <Navbar
        collapsed={collapsed}
        setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
      />
      <h1>Dashboard</h1>
    </div>
  );
}
