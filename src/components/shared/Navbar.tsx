"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBabyCarriage, faBars, faBolt, faCartFlatbedSuitcase, faChevronCircleDown, faChild, faCircleUser, faEllipsis, faEnvelope, faHeart, faIdCard, faLaptop, faMagnifyingGlass, faPersonDress, faPhone, faSuitcaseMedical, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppSelector } from '@/features/auth/store/store'
import useLogout from '@/features/auth/hooks/useLogout'

export default function Navbar() {

   const {logout}  = useLogout()
   const {numOfCartItems}=useAppSelector((state)=>state.cart)
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
   const pathname = usePathname();
   const router = useRouter();
   const { isAuthenticated } = useSelector((state:any) => state.auth);

   const handleLogout = () => {
       logout();
       router.push('/login');
   }

   return (
       <header className='sticky top-0 z-50 bg-white lg:bg-white/80 lg:backdrop-blur-sm shadow-sm'>
           <div className="container mx-auto px-2 sm:px-6 lg:px-8">
               {/* Top Bar */}
               <div className='hidden text-sm lg:flex py-2 items-center gap-2 justify-between border-b border-gray-300/20'>
                   <ul className='flex gap-4 items-center'>
                       <li>
                           <FontAwesomeIcon icon={faPhone} />
                           <a href="tel:+01098758476">+01098758476</a>
                       </li>
                       <li>
                           <FontAwesomeIcon icon={faEnvelope} />
                           <a href="mailto:support@freshcart.com">support@freshcart.com</a>
                       </li>
                   </ul>
                   <ul className='flex gap-5 items-center'>
                       <li><Link href={`track-order`}>Track Order</Link></li>
                       <li><Link href={`about`}>About</Link></li>
                       <li><Link href={`contact`}>Contact</Link></li>
                       <li>
                           <select>
                               <option value="Egp">Egp</option>
                               <option value="SAR">SAR</option>
                               <option value="AED">AED</option>
                           </select>
                       </li>
                       <li>
                           <select>
                               <option value="ar">العربية</option>
                               <option value="en">English</option>
                           </select>
                       </li>
                   </ul>
               </div>

               {/* Main Navbar */}
               <nav className='flex items-center gap-2 justify-between py-4 relative'>
                   <h1>
                       <Link href={"/"}>
                           <Image src="/freshcart-logo.svg" alt="FreshCart Logo" width={150} height={50} />
                       </Link>
                   </h1>

                   <search className='relative hidden lg:block'>
                       <input type="text" placeholder='Search for products' className='px-3 py-2 rounded-md border border-gray-400/5 focus:outline-none focus:border-primary-500 min-w-96' />
                       <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute right-3 inset-y-0 top-1/2 -translate-y-1/2 text-gray-400" />
                   </search>

                   <ul className='hidden lg:flex gap-5 items-center py-4'>
                       <li>
                           <Link href="/wishlist" className={`flex flex-col items-center gap-2 transition-colors duration-200 ${pathname === "/wishlist" ? "text-green-600" : "hover:text-green-500"}`}>
                               <FontAwesomeIcon className="text-lg" icon={faHeart} />
                               <span className="text-sm">Wishlist</span>
                           </Link>
                       </li>
                       <li className='relative'>
                           <Link href="/cart" className={`flex flex-col items-center gap-2 transition-colors duration-200 ${pathname === "/cart" ? "text-green-600" : "hover:text-green-500"}`}>
                               <FontAwesomeIcon className="text-lg" icon={faCartFlatbedSuitcase} />
                               <span className='absolute -top-5 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold'>
                                   {numOfCartItems}
                               </span>
                               <span className='text-sm'>Cart</span>
                           </Link>
                       </li>
                       <li>
                           <Link href="/account" className={`flex flex-col items-center gap-2 transition-colors duration-200 ${pathname === "/account" ? "text-green-600" : "hover:text-green-500"}`}>
                               <FontAwesomeIcon icon={faCircleUser} />
                               <span className='text-sm'>Account</span>
                           </Link>
                       </li>
                       {isAuthenticated ? (
                           <li>
                               <button onClick={handleLogout} className='flex flex-col items-center gap-2 text-green-500'>
                                   <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                   <span className='text-sm'>Logout</span>
                               </button>
                           </li>
                       ) : (
                           <>
                               <li>
                                   <Link href={`/signup`} className={`flex flex-col items-center gap-2 transition-colors duration-200 ${pathname === "/signup" ? "text-green-600" : "hover:text-green-500"}`} >
                                       <FontAwesomeIcon icon={faUserPlus} />
                                       <span className='text-sm'>Sign up</span>
                                   </Link>
                               </li>
                               <li>
                                   <Link href="/login" className={`flex flex-col items-center gap-2 transition-colors duration-200 ${pathname === "/login" ? "text-green-600" : "hover:text-green-500"}`}>
                                       <FontAwesomeIcon icon={faIdCard} />
                                       <span className='text-sm'>Login</span>
                                   </Link>
                               </li>
                           </>
                       )}
                   </ul>

                   <div className='flex items-center gap-4 lg:hidden'>
                       <Link href="/cart" className="relative text-gray-700 hover:text-green-600">
                           <FontAwesomeIcon className="text-2xl" icon={faCartFlatbedSuitcase} />
                           <span className='absolute -top-2 -right-2 bg-green-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm'>
                               {numOfCartItems}
                           </span>
                       </Link>
                       
                       <button className='bg-green-400 rounded text-white p-2 flex items-center justify-center cursor-pointer hover:bg-green-500 transition-colors duration-200' onClick={toggleMenu}>
                           {isMenuOpen ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
                       </button>
                   </div>
               </nav>

               {/* Categories Navbar (Desktop) */}
               <nav className='bg-gray-300/20 py-4 hidden lg:block'>
                   <div className="container mx-auto px-2 flex items-center gap-5">
                       <div className='relative group'>
                           <button className='bg-green-600 rounded text-white flex items-center gap-2 px-3 py-2'>
                               <FontAwesomeIcon icon={faBars} />
                               <span className='text-sm text-white'>All Categories</span>
                               <FontAwesomeIcon icon={faChevronCircleDown} />
                           </button>

                           <menu className='bg-white hidden group-hover:block absolute left-0 top-full w-48 rounded-lg shadow px-3 divide-y-2 divide-gray-300 z-50'>
                               <Link href="/mans-fashoins" className='flex items-center py-1 my-1'>
                                   <li className='flex gap-2 items-center'><FontAwesomeIcon className="text-green-500" icon={faChild} /> <span>Man's Fashion</span></li>
                               </Link>
                               <Link href="/women-fashoins" className='flex items-center py-1 my-1'>
                                   <li className='flex gap-2 items-center'><FontAwesomeIcon className="text-green-500" icon={faPersonDress} /> <span>Women's Fashion</span></li>
                               </Link>
                               <Link href="/electronics" className='flex items-center py-1 my-1'>
                                   <li className='flex gap-2 items-center'><FontAwesomeIcon className="text-green-500" icon={faLaptop} /> <span>Electronics</span></li>
                               </Link>
                           </menu>
                       </div>

                       <ul className='flex gap-5'>
                           <li><Link href={`/`}>Home</Link></li>
                           <li><Link href={`/recently-added`}>Recently Added</Link></li>
                           <li><Link href={`/featured-products`}>Featured Products</Link></li>
                           <li><Link href={`/offers`}>Offers</Link></li>
                           <li><Link href={`/brands`}>Brands</Link></li>
                       </ul>
                   </div>
               </nav>
           </div>

           {/* Mobile Offcanvas Menu */}
           {isMenuOpen && (
             <>
               <div
                 className="fixed inset-0 bg-black/50 z-[1050] cursor-pointer transition-opacity duration-300 opacity-100"
                 onClick={toggleMenu}
               ></div>

               <div className="offcanvas fixed bg-white top-0 bottom-0 left-0 p-5 space-y-7 transition-transform duration-300 ease-in-out translate-x-0 flex flex-col z-[1060]">
                 <div className="flex justify-between items-center mb-5">
                   <Image src="/freshcart-logo.svg" alt="FreshCart Logo" width={150} height={50} />
                   <button
                     className="rounded p-2 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                     onClick={toggleMenu}
                   >
                     <FontAwesomeIcon icon={faXmark} />
                   </button>
                 </div>

                 <div className="overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-green-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                   <ul className="space-y-4 px-3 py-4">
                     <li><Link onClick={toggleMenu} href={`/`} className='py-3 px-4 bl hover:text-green-500 text-base font-medium '>Home</Link></li>
                     
                     <li>
                        <Link onClick={toggleMenu} href="/mans-fashoins" className='py-2 px-3 block flex items-center gap-2 hover:text-green-500 font-medium'>
                            <FontAwesomeIcon className="text-green-500" icon={faChild} /> 
                            <span>Man's Fashion</span>
                        </Link>
                     </li>

                     <li>
                        <Link onClick={toggleMenu} href="/women-fashoins" className='py-2 px-3 block flex items-center gap-2 hover:text-green-500 font-medium'>
                            <FontAwesomeIcon className="text-green-500" icon={faPersonDress} /> 
                            <span>Women's Fashion</span>
                        </Link>
                     </li>

                     <li>
                        <Link onClick={toggleMenu} href="/electronics" className='py-2 px-3 block flex items-center gap-2 hover:text-green-500 font-medium'>
                            <FontAwesomeIcon className="text-green-500" icon={faLaptop} /> 
                            <span>Electronics</span>
                        </Link>
                     </li>





                     <li><Link onClick={toggleMenu} href={`/recently-added`} className='py-2 px-3 block hover:text-green-500 '>Recently Added</Link></li>
                     <li><Link onClick={toggleMenu} href={`/featured-products`} className='py-2 px-3 block hover:text-green-500'>Featured Products</Link></li>
                     <li><Link onClick={toggleMenu} href={`/offers`} className='py-2 px-3 block hover:text-green-500'>Offers</Link></li>
                     <li><Link onClick={toggleMenu} href={`/brands`} className='py-2 px-3 block hover:text-green-500'>Brands</Link></li>
                     
                     <li>
                        <div className='border text-gray-200 my-2'></div>
                       <Link
                         onClick={toggleMenu}
                         href="/wishlist"
                         className={`py-2 px-3 block flex items-center gap-2 ${
                           pathname === "/wishlist" ? "text-green-600" : "hover:text-green-500"
                         }`}
                       >
                         <FontAwesomeIcon icon={faHeart} />
                         Wishlist
                       </Link>
                     </li>
                     <li>
                       <Link
                         onClick={toggleMenu}
                         href="/cart"
                         className={`py-2 px-3 block flex items-center gap-2 ${
                           pathname === "/cart" ? "text-green-600" : "hover:text-green-500"
                         }`}
                       >
                         <FontAwesomeIcon icon={faCartFlatbedSuitcase} />
                         Cart
                         <span className="bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                           {numOfCartItems}
                         </span>
                       </Link>
                     </li>
                     <li>
                       <Link
                         onClick={toggleMenu}
                         href="/account"
                         className={`py-2 px-3 block flex items-center gap-2 ${
                           pathname === "/account" ? "text-green-600" : "hover:text-green-500"
                         }`}
                       >
                         <FontAwesomeIcon icon={faCircleUser} />
                         Account
                       </Link>
                     </li>
                     {isAuthenticated ? (
                       <li>
                         <button
                           onClick={() => { handleLogout(); toggleMenu(); }}
                           className="py-2 px-3 w-full text-left hover:text-green-500"
                         >
                           Logout
                         </button>
                       </li>
                     ) : (
                       <>
                         <li>
                           <Link
                             onClick={toggleMenu}
                             href="/signup"
                             className={`py-2 px-3 block hover:text-green-500 ${
                               pathname === "/signup" ? "text-green-600" : ""
                             }`}
                           >
                             Sign up
                           </Link>
                         </li>
                         <li>
                           <Link
                             onClick={toggleMenu}
                             href="/login"
                             className={`py-2 px-3 block hover:text-green-500 ${
                               pathname === "/login" ? "text-green-600" : ""
                             }`}
                           >
                             Login
                           </Link>
                         </li>


                         <li>
                           <Link
                             onClick={toggleMenu}
                             href="/account"
                             className={`py-2 px-3 block hover:text-green-500 ${
                               pathname === "/account" ? "text-green-600" : ""
                             }`}
                           >
                             Login
                           </Link>
                         </li>


                       </>
                     )}
                   </ul>
                 </div>
               </div>
             </>
           )}
       </header>
   )}