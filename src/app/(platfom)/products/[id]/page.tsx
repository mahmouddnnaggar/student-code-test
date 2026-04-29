import RelatedProductsSlider from "@/features/categories/component/RelatedProductsSlider";
import ProductInfo from "@/features/products/components/ProductDetails/ProductInfo";

// 1. دالة تجيب بيانات المنتج الحالي
async function getProduct(id: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  const data = await res.json();
  return data.data;
}

// 2. دالة تجيب كل المنتجات عشان نطلع منها "المشابه"
async function getRelatedProducts(categoryId: string, currentProductId: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
  const data = await res.json();
  const allProducts = data.data;
  
  // بنفلتر المنتجات اللي من نفس الكاتيجوري وبنشيل المنتج اللي فاتحينه حالياً
  return allProducts.filter(
    (p: any) => p.category._id === categoryId && p._id !== currentProductId
  );
}

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { id } = await params;

  // جلب بيانات المنتج
  const product = await getProduct(id);

  if (!product) {
    return <div className="text-center py-20">Loading product details...</div>;
  }

  // بعد ما اتأكدنا إن المنتج موجود، نجيب المنتجات المشابهة باستخدام الكاتيجوري بتاعه
  const relatedProducts = await getRelatedProducts(product.category._id, id);

  return (
    <main className="container mx-auto px-4">
      {/* عرض تفاصيل المنتج */}
      <ProductInfo product={product} />

      {/* عرض السلايدر تحت التفاصيل */}
      {relatedProducts.length > 0 && (
        <RelatedProductsSlider products={relatedProducts} />
      )}
    </main>
  );
}