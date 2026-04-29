import SignupForm from "../components/Signup/SignupForm";
import SignupHero from "../components/Signup/SignupHero";

export default function SignupScreen() {
  return <>

  <div className="  container py-12 px-4  flex flex-col md:flex-row   lg:gap-12  mx-auto items-center  justify-center gap-8  ">
    <div className="w-full md:w-2/5 flex justify-center md:justify-start">
  <SignupHero />
  </div>
  <div className="w-full md:w-3/5 "> 
     <SignupForm/>
</div>
  
</div>
  </>



  
}
