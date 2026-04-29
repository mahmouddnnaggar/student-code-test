import ProductCard from "@/features/products/components/ProductCard";
import DealsBanner from "../components/DealsBanner";
import OurCategories from "../components/OurCategories";
import PromBanner from "../components/PromBanner";
import Slider from "../components/Slider";
import FeatturedProducts from "@/features/products/components/FeatturedProducts";
import Newsliter from "../components/Newsliter";

export default function homeScreen() {
  return <>
  
  <><Slider/></>
  
<PromBanner/>
<OurCategories/>
<DealsBanner/>
<FeatturedProducts/>
<Newsliter/>

  </>
  
}
