"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faEnvelope,
  faLeaf,
  faTruck,
  faTag,
  faStar
} from "@fortawesome/free-solid-svg-icons"

import {
  faApple,
  faGooglePlay
} from "@fortawesome/free-brands-svg-icons"

export default function Newsletter() {
  return (

    <section className="py-20 bg-[#f3fdf6]">

      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-lg p-10">

          {/* LEFT SIDE */}
          <div>

            <div className="flex items-center gap-3 mb-4">

              <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-xl">
                <FontAwesomeIcon icon={faEnvelope} className="text-green-600 text-lg" />
              </div>

              <div>
                <p className="font-semibold">NEWSLETTER</p>
                <p className="text-sm text-gray-500">50,000+ subscribers</p>
              </div>

            </div>

            <h2 className="text-3xl font-bold mb-3">
              Get the Freshest Updates
              <span className="text-green-600"> Delivered Free</span>
            </h2>

            <p className="text-gray-500 mb-6">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-3 mb-8">

              <div className="flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">
                <FontAwesomeIcon icon={faLeaf} />
                Fresh Picks Weekly
              </div>

              <div className="flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">
                <FontAwesomeIcon icon={faTruck} />
                Free Delivery Codes
              </div>

              <div className="flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">
                <FontAwesomeIcon icon={faTag} />
                Members-Only Deals
              </div>

            </div>

            {/* INPUT */}
            <div className="flex gap-3">

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition">
                Subscribe
              </button>

            </div>

            <p className="text-xs text-gray-400 mt-3">
              Unsubscribe anytime. No spam, ever.
            </p>

          </div>


          {/* RIGHT SIDE */}
          <div className="bg-gradient-to-br from-green-700 via-green-600 to-gray-900 text-white p-8 rounded-2xl">

            <p className="text-green-200 text-sm mb-2">
              MOBILE APP
            </p>

            <h3 className="text-2xl font-bold mb-3">
              Shop Faster on Our App
            </h3>

            <p className="text-gray-200 mb-6">
              Get app-exclusive deals & 15% off your first order.
            </p>


            {/* APP STORE BUTTON */}
            <div className="space-y-4">

              <button className="flex items-center gap-3 border border-gray-500 w-full px-4 py-3 rounded-lg hover:bg-white hover:text-black transition">

                <FontAwesomeIcon icon={faApple} className="text-xl" />

                <div className="text-left">
                  <p className="text-xs">Download on</p>
                  <p className="font-semibold">App Store</p>
                </div>

              </button>


              {/* GOOGLE PLAY BUTTON */}
              <button className="flex items-center gap-3 border border-gray-500 w-full px-4 py-3 rounded-lg hover:bg-white hover:text-black transition">

                <FontAwesomeIcon icon={faGooglePlay} className="text-xl" />

                <div className="text-left">
                  <p className="text-xs">GET IT ON</p>
                  <p className="font-semibold">Google Play</p>
                </div>

              </button>

            </div>


            {/* RATING */}
            <div className="flex items-center gap-2 mt-6 text-yellow-400">

              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />

              <span className="text-white text-sm ml-2">
                4.9 • 100K+ downloads
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>

  )
}