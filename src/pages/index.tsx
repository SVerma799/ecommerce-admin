import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="font-signika">
      <Navbar />
      <h1>Next.js + TypeScript + Tailwind CSS + Google Fonts</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim rem
        deleniti esse, asperiores eos laboriosam autem est minus labore numquam
        quod cumque possimus ipsa mollitia accusamus fugit eligendi eius fugiat
      </p>
    </main>
  );
}
