import { faShieldHalved, faStar, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'




export default function SignupHero() {
  return <>
  <div className=''>

<div className="">

<h2 className='text-4xl  font-bold py-3'>Welcom to <span className=' text-green-500'>FreshCart</span></h2>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, aut?Lorem ipsum dolor sit amet.</p>

</div>
<ul className='space-y-5 py-5'>
<li className='flex items-center gap-2'>
<div className="icon bg-green-300 rounded-full size-10 flex items-center justify-center text-green-500  ">
    <FontAwesomeIcon  icon={faStar} />
</div>
<div className="content">
<h3 className=' font-bold'>Premium Quality</h3>
<p className='text-gray-500'> premium quality proucts sourced from suppliers</p>
</div>
</li>
<li className='flex items-center gap-2'>
<div className="icon bg-green-300 rounded-full size-10 flex items-center justify-center text-green-500">
    <FontAwesomeIcon icon={faTruckFast} />
</div>
<div className="content">
    <h3 className='font-bold'>Fast Delivery</h3>
    <p className='text-gray-500'>Same-day delivery available in most areas</p>
</div>
</li>


<li className='flex items-center gap-2'>
<div className="icon  bg-green-300 rounded-full size-10 flex items-center justify-center text-green-500">
    <FontAwesomeIcon icon={faShieldHalved} />
</div>
<div className="content">
<h3 className='font-bold'>Secure Shopping</h3>
<p className='text-gray-500'>Your data and payments are completely secur</p>
</div>
</li>
</ul>


<div className='review bg-white shadow rounded-xl p-5 '>
<div className=' flex gap-3 py-1'>
<Image src="/review-author.png" alt="Sara johnson profile img" width={40} height={40}className='rounded-full' />
<div>
    <h3 className='text-xl bold'>Sara johnson</h3>
    <div className="rating text-yellow-500">

{[...Array(5)].map((_, index) => (
  <FontAwesomeIcon key={index} icon={faStar} />
))}

    </div>
</div>

</div>
<blockquote>
    <p className='text-gray-500'>FreshCart has transformed my shopping experience. The quality of the products is 
        outstanding, and the delivery is always on time Hihly recmmend</p>
</blockquote>


</div>

  </div>

  
  
  
  
  
  
  
  
  </>
  
}
