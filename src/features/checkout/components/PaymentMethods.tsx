interface PaymentMethodsProbs {
  selectedMethod: "cash" | "card";
  changeMethod: (method: "cash" | "card") => void;
}

export default function PaymentMethod({
  selectedMethod,
  changeMethod,
}: PaymentMethodsProbs) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-5">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          💳 Payment Method
        </h2>
        <p className="text-sm opacity-90">
          Choose how you'd like to pay
        </p>
      </div>

      {/* Body */}
      <div className="p-6 bg-white space-y-5">

        {/* Cash on Delivery */}
        <div
          onClick={() => {
            changeMethod("cash");
          }}
          className={`border rounded-xl p-5 flex items-center justify-between transition cursor-pointer
          ${
            selectedMethod === "cash"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 hover:border-green-400"
          }`}
        >

          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition
              ${
                selectedMethod === "cash"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              💵
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                Cash on Delivery
              </h3>
              <p className="text-sm text-gray-500">
                Pay when your order arrives at your doorstep
              </p>
            </div>
          </div>

          {selectedMethod === "cash" && (
            <span className="text-green-600 text-xl font-bold">✓</span>
          )}
        </div>

        {/* Pay Online */}
        <div
          onClick={() => {
            changeMethod("card");
          }}
          className={`border rounded-xl p-5 flex items-center justify-between transition cursor-pointer
          ${
            selectedMethod === "card"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 hover:border-green-400"
          }`}
        >

          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition
              ${
                selectedMethod === "card"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              💳
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                Pay Online
              </h3>
              <p className="text-sm text-gray-500">
                Secure payment with Credit/Debit Card via Stripe
              </p>

              <div className="flex gap-2 mt-2">
                <span className="w-8 h-5 bg-blue-600 rounded"></span>
                <span className="w-8 h-5 bg-red-500 rounded"></span>
                <span className="w-8 h-5 bg-blue-400 rounded"></span>
              </div>
            </div>
          </div>

          {selectedMethod === "card" && (
            <span className="text-green-600 text-xl font-bold">✓</span>
          )}
        </div>

        {/* Secure Box */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-5 flex items-center gap-3">
          <span className="text-green-600 text-lg">🛡</span>

          <div>
            <p className="text-green-700 font-semibold text-sm">
              Secure & Encrypted
            </p>
            <p className="text-green-600 text-xs">
              Your payment info is protected with 256-bit SSL encryption
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}