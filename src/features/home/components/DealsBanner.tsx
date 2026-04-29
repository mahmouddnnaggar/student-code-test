"use client"

import { motion } from "framer-motion"

export default function HeroCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Card 1 - Fresh Organic Fruits */}
        <motion.div
          initial={{ opacity: 0, x: -120, y: 50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          className="relative bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 sm:p-10 shadow-lg min-h-[220px] flex flex-col justify-between overflow-hidden"
        >
          {/* Badge */}
          <span className="absolute top-5 left-5 bg-white/25 px-3 py-1 rounded-full text-xs font-semibold">
            Deal of the Day
          </span>

          {/* Title & Description */}
          <div className="z-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Fresh Organic Fruits
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/90">
              Get up to 40% off on selected organic fruits
            </p>

            {/* Countdown Timer */}
            <div className="mt-4 flex gap-2 text-white">
              <div className="bg-white/20 px-3 py-1 rounded text-center">
                <span className="font-bold">12</span> Hours
              </div>
              <div className="bg-white/20 px-3 py-1 rounded text-center">
                <span className="font-bold">45</span> Mins
              </div>
              <div className="bg-white/20 px-3 py-1 rounded text-center">
                <span className="font-bold">30</span> Secs
              </div>
            </div>
          </div>

          {/* Button */}
          <button className="mt-6 bg-white text-green-600 px-5 py-2 rounded-full font-semibold w-max hover:scale-105 transition-all">
            Shop Now →
          </button>
        </motion.div>

        {/* Card 2 - Exotic Vegetables */}
        <motion.div
          initial={{ opacity: 0, x: 120, y: 50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          className="relative bg-gradient-to-r from-orange-400 to-red-500 rounded-xl p-8 sm:p-10 shadow-lg min-h-[220px] flex flex-col justify-between overflow-hidden"
        >
          {/* Badge */}
          <span className="absolute top-5 left-5 bg-white/25 px-3 py-1 rounded-full text-xs font-semibold">
            New Arrivals
          </span>

          {/* Title & Description */}
          <div className="z-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Exotic Vegetables
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/90">
              Discover our latest collection of premium vegetables
            </p>

            <p className="mt-3 text-white font-bold text-lg">
              25% OFF <span className="text-sm font-normal">Use code: FRESH25</span>
            </p>
          </div>

          {/* Button */}
          <button className="mt-6 bg-white text-orange-600 px-5 py-2 rounded-full font-semibold w-max hover:scale-105 transition-all">
            Explore Now →
          </button>
        </motion.div>

      </div>
    </section>
  )
}
