import React from 'react'
import Image from 'next/image'
const Footer = () => {
  return (
    <footer className="bg-[#284E4C] text-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src="/images/flex-logo-2.webp" alt="Flex Living" width={120} height={120} />
          </div>
          <p className="text-gray-400 mb-4">
            Your gateway to premium short-term rental experiences worldwide.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Properties</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors text-gray-300">New York</a></li>
            <li><a href="#" className="hover:text-white transition-colors text-gray-300">London</a></li>
            <li><a href="#" className="hover:text-white transition-colors text-gray-300">Tokyo</a></li>
            <li><a href="#" className="hover:text-white transition-colors text-gray-300">Paris</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors text-gray-300">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors text-gray-300">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors text-gray-300">Safety</a></li>
            <li><a href="#" className="hover:text-white transition-colors text-gray-300">Terms</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors text-gray-300">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors text-gray-300">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors text-gray-300">Press</a></li>
            <li><a href="#" className="hover:text-white transition-colors text-gray-300">Blog</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
        <p>&copy; 2025 Flex Living. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer