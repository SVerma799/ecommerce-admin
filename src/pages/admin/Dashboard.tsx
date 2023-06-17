import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <div className="flex gap-2">
      <Navbar />
      <div className="m-8">
        <h1 className="text-3xl">Dashboard</h1>
        <p className="mt-4">All your added products</p>
      </div>
    </div>
  );
}
