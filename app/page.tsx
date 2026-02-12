import { PublicFooter } from "@/components/public/footer";
import { PublicHome } from "@/components/public/home";
import { Navbar } from "@/components/public/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <PublicHome/>
      <PublicFooter />
    </main>
  );
}
