import { Order } from "../types/orders.types";
import { faCircleCheck, faTruck, faClock, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrderCard({ order }: { order: Order }) {
  
  function getStatus() {
    if (order.isDelivered) {
      return {
        label: "Delivered",
        icon: faCircleCheck,
        colors: {
          background: "bg-green-200",
          text: "text-green-600",
          border: "border-green-300",
        },
      };
    }
    if (order.isPaid) {
      return {
        label: "On the way",
        icon: faTruck,
        colors: {
          background: "bg-blue-200",
          text: "text-blue-600",
          border: "border-blue-300",
        },
      };
    }
    return {
      label: "Processing",
      icon: faClock,
      colors: {
        background: "bg-gray-200",
        text: "text-gray-600",
        border: "border-gray-300",
      },
    };
  }

  const status = getStatus();

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        
        {/* رأس الكارت - بيانات الطلب */}
        <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-6 md:gap-12">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</p>
              <p className="text-sm font-bold text-gray-900 mt-1">#{order._id.slice(-6).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date & Time</p>
              <p className="text-sm font-semibold text-gray-700 mt-1">
                {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                <span className="text-gray-400 mx-1">|</span>
                {new Date(order.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Price</p>
              <p className="text-sm font-black text-green-700 mt-1">{order.totalOrderPrice} EGP</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1 ${status.colors.background} ${status.colors.text} ${status.colors.border}`}>
              <FontAwesomeIcon icon={status.icon} />
              {status.label}
            </span>
            <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-tighter border ${
                order.isPaid ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
            }`}>
                ● {order.isPaid ? "Paid" : "Cash on Delivery"}
            </span>
          </div>
        </div>

        {/* إضافة قسم بيانات الشحن (العنوان، المدينة، التليفون) */}
        <div className="px-6 py-3 border-b border-gray-50 bg-white flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-2 text-gray-600">
                <FontAwesomeIcon icon={faLocationDot} className="text-gray-400 text-xs" />
                <p className="text-xs font-medium">
                    {order.shippingAddress.city} - <span className="text-gray-500">{order.shippingAddress.details}</span>
                </p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
                <FontAwesomeIcon icon={faPhone} className="text-gray-400 text-xs" />
                <p className="text-xs font-bold">{order.shippingAddress.phone}</p>
            </div>
        </div>

        {/* محتويات الطلب (المنتجات) */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {order.cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50/50 transition">
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-100 bg-white flex-shrink-0">
                  <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.product.title}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-400">Qty: <span className="text-gray-900 font-bold">{item.count}</span></p>
                    <p className="text-sm font-black text-gray-900">{item.price} EGP</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100 flex justify-end items-center gap-4">
           <button className="text-xs font-bold text-gray-500 hover:text-green-600 transition">View Details</button>
           <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
           <button className="text-xs font-bold text-gray-500 hover:text-green-600 transition">Download Invoice</button>
        </div>
      </div>
    </>
  );
}