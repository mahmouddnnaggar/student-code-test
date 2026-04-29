import getAllCategories from "@/features/categories/server/categories.actions"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import Image from 'next/image'


export default async function OurCategories() {

const response =await getAllCategories()



  return <>
  
  <section id="categories" className="py-10">
<div className="container mx-auto px-4">
<div className="flex justify-between items-center mb-8">
    <div className="flex items-center gap-3 my-8">
<div className="h-8 w-1.5 bg-linear-to-b from-emerald-700 rounded-full"></div>
<h2 className="text-3xl font-bold text-gray-800">
Shop By<span className="text-emerald-600"> Category</span>
</h2>
    </div>
      
<Link href={`categories`} className="text-primary-600 hover:text-primary-700 font-medium flex items-center cursor-pointer">
View All Categories
<FontAwesomeIcon icon={faArrowRight} className="ml-2"  />
</Link>
</div>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
{response.data.map((Category)=>(
<Link href={`/categories/${Category._id}`}  
key={Category._id}
className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer"
>
<div className="h-20 w-20 overflow-hidden bg-primary-100 rounded-full flex items-center justify-center mx-auto ">
<Image
height={300}
width={300}
src={Category.image}
alt={Category.name}

className="w-full h-full object-cover"
></Image>
</div>

<h3 className="font-medium">{Category.name}</h3>
</Link>
))}
</div>
</div>
  </section>
  
  
  
  
  </>
  
}
