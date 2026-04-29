import { useDebugValue } from "react";
import { setAuthInfo } from "../server/auth.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearToken } from "../server/auth.actions";
import { toast } from "react-toastify";




export default   function useLogout() {
const dispatch=useDispatch()
const router=useRouter();

const logout=  async ()=>{
    
   await clearToken();

dispatch(setAuthInfo({isAuthenticated:false,userInfo:null}));
toast.success("Logged out successfully")
router.push("/login");
router.refresh();
};


return{logout}
}
