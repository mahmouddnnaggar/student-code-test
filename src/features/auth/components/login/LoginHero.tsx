import { faClock, faShieldHalved, faStar, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'


export default function SignupHero() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        
        {/* الصورة */}
        <div className="w-full">
          <Image
            src="/WhatsApp Image 2026-02-28 at 2.31.47 PM.jpeg"
            alt="Sara johnson profile img"
            width={600}      // حجم الصورة الأصلي
            height={800}
            className="rounded w-full"
          />
        </div>

        <h2 className="text-1xl sm:text-2xl md:text-3xl font-bold mt-4 text-center w-full">
          FreshCart-Your One-Stop or Fresh
        </h2>

        <span className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 text-center w-full">
          Products
        </span>
        <p className='mt-4 text-center text-gray-700 sm:text-lg md:text-xl max-w-orose'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ut fuga beatae, nihil officiis cumque!</p>
<div className='flex flex-col sm:flex-row justify-center items-center mt-8 gap-8 w-full '>
<div className='flex flex-col items-center'>
    <FontAwesomeIcon icon={faTruckFast} className="text-green-500"/>

<span className='mt-2 text-center font-semiold'>Free Delivery</span>

</div>

<div className='flex flex-col items-center'>
    <FontAwesomeIcon icon={faShieldHalved} className="text-green-500"/>

<span className='mt-2 text-center font-semiold'>Secure Payment</span>

</div>
<div className='flex flex-col items-center'>
<FontAwesomeIcon icon={faClock} className="text-green-500"/>
<span className='mt-2 text-center font-semiold'>24/7 Support</span>

</div>





</div>

      </div>
    </div>
  );
}