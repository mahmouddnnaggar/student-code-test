import { faArrowRotateLeft, faBolt, faCartShopping, faHeart, faMinus, faPlus, faShareNodes, faShieldHalved, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { getProductById } from "../server/products.action";
import ProductInfo from "../components/ProductDetails/ProductInfo";



export default  async    function ProductDetailsScreen({productId}:{productId:string}) {
const response=await getProductById({id:productId})

  return<>
  <ProductInfo product={response.data}/>
  </>
  
}