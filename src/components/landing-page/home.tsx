/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useProperties } from '@/hooks/api/use-properties';
import { QueryError } from '@/components/query-error';
import { 
  Star, 
  MapPin, 
  Shield, 
  ArrowRight,
  Home,
  BookOpen,
  Building,
  Telescope
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/footer';
import Locations from './locations';

export default function HomePage() {
  const { data: propertiesData, isLoading, error, refetch } = useProperties();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
  


      <section 
        className="pt-[150px] pb-16 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh)] flex items-center relative"
        style={{
          backgroundImage: 'url(/images/try2.gif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Find Your Perfect
                <span className="text-blue-300 block">Flexible Living Space</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Discover premium short-term rentals in the world&apos;s most desirable locations. 
                Experience comfort, convenience, and flexibility like never before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#properties">
                  <Button
                    size="lg"
                    className="flex items-center bg-white hover:bg-white/90 text-[#284E4C] px-8 py-3 text-base h-12 border border-[#284E4C]/20"
                  >
                    <Telescope className="w-5 h-5 mr-2" />
                    Explore Properties
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex items-center px-8 py-3 text-base h-12 bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>  
            </motion.div>
          </div>
        </div>
      </section>

      <Locations />

     
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFDF6]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Flex Living?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide exceptional short-term rental experiences with unmatched quality and service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="h-8 w-8 text-[#284E4C]" />,
                title: "Premium Quality",
                description: "Skip the hassle — we'll handle your searches. Whether you need one apartment or several, we'll quickly deliver the best options tailored to your specific needs."
              },
              {
                icon: <MapPin className="h-8 w-8 text-[#284E4C]" />,
                title: "Prime Locations",
                description: "njoy personalised service with a dedicated account manager as your single point of contact. From new bookings to ongoing stays, you'll have expert support every step of the way."
              },
              {
                icon: <Shield className="h-8 w-8 text-[#284E4C]" />,
                title: "Secure & Safe",
                description: "We know plans change. That's why our flexible rental terms let you book for as short or long as you need—with month-to-month leases, hassle-free extensions, and easy exits to keep your business agile."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center flex flex-col items-center gap-4">
                    <div className="flex justify-center items-center rounded-full bg-[#CBD4D3] p-2 h-14 w-14">
                      <div className="flex justify-center text-[#284E4C]">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-light">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
      <section id="properties" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and highly-rated properties around the world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading state
              Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-200 animate-pulse"></div>
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
                        <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : error ? (
              // Error state
              <div className="col-span-full flex justify-center">
                <QueryError
                  error={error}
                  onRetry={() => refetch()}
                  title="Failed to load properties"
                  description="Unable to fetch property data. Please try again."
                />
              </div>
            ) : propertiesData?.data && propertiesData.data.length > 0 ? (
              // Properties data
              propertiesData.data.slice(0, 6).map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-video relative">
                      {property.images && property.images.length > 0 ? (
                        <img
                          src={property.images[0]}
                          alt={property.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <Home className="h-16 w-16 text-white opacity-50" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{property.averageRating.toFixed(1)}</span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {property.name}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.city}, {property.country}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-[#284E4C]">
                          {property.price?.currency || '$'}{property.price?.perNight || 'N/A'}/night
                        </span>
                        <Link href={`/properties/${property.id}`}>
                          <Button size="sm" className="bg-[#284E4C] hover:bg-[#284E4C]/90 h-10 p-4">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              // No properties found
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Home className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties available</h3>
                <p className="text-gray-600">Check back later for new listings!</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
