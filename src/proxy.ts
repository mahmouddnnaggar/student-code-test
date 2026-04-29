import { NextRequest, NextResponse } from "next/server";


const protecteRoutes=[
"/cart",
"/checkout",
"/orders",
'/wishlist',
"/profile",

]

const authRoutes=[
    "/login",
    "/signup",
    "/forget-password",
    "/reset-password",

]



export default function proxy(request:NextRequest){
      const{pathname}     = request.nextUrl;
      const token=request.cookies.get("token")?.value||null;
      const isAuthenticated=!!token;



      const isProtectedRoute=protecteRoutes.some((route)=>
    
    pathname==route||pathname.startsWith(`${route}/`)
    
    );

const isAuthRut=authRoutes.some((route)=>
route==pathname||pathname.startsWith(`${route}/`)

)



    if(isProtectedRoute&&!isAuthenticated){
const loginUrl=new URL("/login",request.url)

return NextResponse.redirect(loginUrl)
    }

if(isAuthRut&&isAuthenticated){


    return NextResponse.redirect(new URL('/',request.url))
}

return NextResponse.next()



}


export const config = {
    matcher:[
"/profile/:path*",
"/checkout/:path*",
"/cart/:path*",
"/wishlist/:path*",
"/orders/:path*",
'/login',
'/signp',
'/forget-password',
'/reset-password',


    ]
}