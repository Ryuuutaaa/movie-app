import { Inter } from "next/font/google";
import Category from "@/components/Category";
import Landing from "@/components/Landing";
import Navbar from "@/components/Navbar";
import AnotherCollection from "@/components/Collections";
import Upcoming from "@/components/Upcoming";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <Landing />
      <div className="flex">
        <AnotherCollection />
        <Upcoming />
      </div>

      <Category />
    </>
  );
}
