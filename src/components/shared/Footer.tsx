
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { faFacebook, faInstagram, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/dist/client/link'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
export default function Footer() {
  return (
  <>
  <footer className='py-5 bg-white border-t border-gray-400/20'>

  <div className='container'>


<div className='grid md:grid-cols-2 xl:grid-cols-5 gap-5 '>
<div className='xl:col-span-2 space-y-5'>
  <Image src="/freshcart-logo.svg" alt="FreshCart Logo" width={150} height={50} />
  <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, tempore libero! Odit, possimus deserunt.</p>

  <ul className='flex gap-3 items-center text-gray-400 *:hover:text-gray-600 transition-colors duration-300'>
    <li><a href="#">
      <FontAwesomeIcon icon={faFacebook} />
    </a>
    </li>
    <li><a href="#">
      <FontAwesomeIcon icon={faTwitter} />
      </a></li>
    <li><a href="#">
      
      <FontAwesomeIcon icon={faInstagram} />
      </a></li>


    <li><a href="#">
      
      <FontAwesomeIcon icon={faPinterestP} />
      </a></li>

  </ul>
</div>

  <div >
< h2  className='text-xl font-bold mb-4'>Categories</h2>
<ul  className='space-y-3  *:hover:text-green-500   '>
  <li><Link href={{}}>Men's Fashion</Link></li>
  <li><Link href={{}}>Women's Fashion</Link></li>
  <li><Link href={{}}>Baby & Toys</Link></li>
   <li><Link href={{}}>Beauty & Health</Link></li>
    <li><Link href={{}}>Electronics</Link></li>
    
</ul>
  </div>



  <div>
<h2 className='text-xl font-bold mb-4 '>Quick Link</h2>
<ul className='space-y-3   *:hover:text-green-500   '>
  <li><Link href="/about">About Us</Link></li>
  <li><Link href="/contact">Contact Us</Link></li>
  <li><Link href="/privacy-policy">Privacy Policy</Link></li>
   <li><Link href="/terms">Terms of Service</Link></li>
    <li><Link href="/shipping-policy">Shipping Policy</Link></li>
    
</ul>
  </div>


  <div >
<h2 className='text-xl font-bold mb-4 '>Customer Service</h2>
<ul className='space-y-3 *:hover:text-green-500   '>
  <li><Link href={{}}>My Account</Link></li>
  <li><Link href={{}}>My Orders</Link></li>
  <li><Link href={{}}>Wishlist</Link></li>
   <li><Link href="/re
   ">Returns & Refunds</Link></li>
    <li><Link href="/help-center">Help center</Link></li>
    
</ul>
  </div>


</div>
<div className='flex items-center  justify-between'>
<p > <span className='text-green-500'>@{new Date().getFullYear() }</span> FreshCart. All rights reserved.</p>

<Image src="/mini-logo.png" alt="Payment Methods" width={40} height={30} />
</div>

</div>


  </footer>
  

  
  
  </>
  )
}

