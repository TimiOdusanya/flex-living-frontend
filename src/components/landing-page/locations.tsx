'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Locations = () => {
  const locations = [
    {
      id: 1,
      name: 'LONDON',
      image: '/images/london.webp',
      description: 'Experience the charm of London with iconic landmarks and modern living'
    },
    {
      id: 2,
      name: 'ALGIERS',
      image: '/images/algiers.webp',
      description: 'Discover the beauty of North African architecture and culture'
    },
    {
      id: 3,
      name: 'PARIS',
      image: '/images/paris.webp',
      description: 'Live in the City of Light with its romantic streets and rich history'
    },
    {
      id: 4,
      name: 'LISBON',
      image: '/images/lisbon.webp',
      description: 'Enjoy the vibrant colors and charming trams of Portugal\'s capital'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF9E9]">
      <div className="max-w-7xl mx-auto">
     
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Furnished apartments in top locations
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The Flex apartments are designed with you in mind – all you have to do is unpack your bags and start living. 
            With flexible terms and seamless service, we offer move-in ready apartments across top cities around the globe. 
            Stay for days, weeks or months, and leave when it suits you.
          </p>
        </motion.div>

  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              
                <div className="aspect-[4/3] relative">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">
                      {location.name}
                    </h3>
                    <p className="text-white/90 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {location.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to find your perfect flexible living space?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#284E4C] hover:bg-[#284E4C]/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300"
          >
            Explore All Locations
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;