import OrderCard from "../components/orderCard"
import { getUserOrder } from "../server/orders.actions"
import { Order } from "../types/orders.types"

export default async function OrdersScreen() {
  
  const response = await getUserOrder();
  
  const orders : Order[] = response || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-gray-200 pb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Orders History</h1>
            <p className="text-gray-500 mt-2 text-sm">
              Track and manage your {orders.length} {orders.length === 1 ? "order" : "orders"}
            </p>
          </div>
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-green-700 transition shadow-lg shadow-green-100">
            Continue Shopping
          </button>
        </div>

        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
              <p className="text-gray-500 font-bold">You don't have any orders yet.</p>
            </div>
          ) : (
            orders.map((order: any) => (
              <OrderCard key={order._id} order={order} />
            ))
          )}
        </div>

      </div>
    </div>
  )
}