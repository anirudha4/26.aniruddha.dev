'use client';
import Experience from "@/components/product/experience"
import Footer from "@/components/product/footer"
import Header from "@/components/product/header"
import Hero from "@/components/product/hero"
import Work from "@/components/product/work"
import { useBorderSettings } from "@/contexts/border-settings-context";
import { cn } from "@/lib/utils";

type Props = {}
const Home = ({ }: Props) => {
  const { showBorders } = useBorderSettings();
  return (
    <div className={cn(
      "min-h-screen max-w-xl relative pb-5 mx-auto border-x border-x-transparent",
      showBorders && "border-x-border"
    )}>
      <Header />
      <Hero />
      <Experience />
      <Work />
      <Footer />
    </div>
  )
}
export default Home