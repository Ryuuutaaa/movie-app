import Image from "next/image";
import { Inter } from "next/font/google";
import Collection from "@/components/Collection";
import Category from "@/components/Category";
import Landing from "@/components/Landing";
import TestKey from "@/components/TestKey";
import AnotherCollection from "@/components/AnotherCollection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Landing />
      <AnotherCollection />
      <Category />
    </>
  );
}
