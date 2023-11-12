import Image from "next/image";
import { Inter } from "next/font/google";
import Collection from "@/components/Collection";
import Category from "@/components/Category";
import Landing from "@/components/Landing";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Landing />
      <Collection />
      <Category />
    </>
  );
}
