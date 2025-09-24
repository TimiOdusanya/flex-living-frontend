/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useProperty } from '@/hooks/api/use-properties';
import { useApprovedReviews } from '@/hooks/api/use-reviews';
import { LoadingSpinner } from '@/components/loading-spinner';
import { QueryError } from '@/components/query-error';
import { 
  Star, 
  MapPin, 
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Users,
  Bed,
  Bath,
  Home,
  Expand
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import PropertyInfo from '@/components/properties/property-info';

interface PropertyImage {
  id: number;
  url: string;
  alt: string;
}

export default function PropertyDetailsPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { 
    data: propertyResponse, 
    isLoading: propertyLoading, 
    error: propertyError 
  } = useProperty(propertyId);

  const { 
    data: approvedReviewsResponse, 
    isLoading: reviewsLoading, 
    error: reviewsError 
  } = useApprovedReviews(propertyId);

  const property = propertyResponse?.data;
  const approvedReviews = approvedReviewsResponse?.data || [];
  const googleReviews: never[] = [];

  
  const propertyImages: PropertyImage[] = property?.images?.map((url: string, index: number) => ({
    id: index + 1,
    url,
    alt: `${property.name} - Image ${index + 1}`
  })) || [];

  const allReviews = [...approvedReviews, ...googleReviews];
  const loading = propertyLoading || reviewsLoading;
  const error = propertyError || reviewsError;

  const openModal = (index: number) => {
    if (propertyImages.length > 0) {
      setCurrentImageIndex(index);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading property details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <QueryError
          error={error}
          title="Failed to load property"
          description="Unable to fetch property details. Please try again."
        />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-[#FFFDF6]">


      <div className="mt-24 max-w-[80%] mx-auto">
        <section className="relative">
          {propertyImages.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 h-[500px] lg:h-[600px]">
              <div className="lg:col-span-2 relative group cursor-pointer" onClick={() => propertyImages.length > 0 && openModal(0)}>
                <img
                  src={propertyImages[0].url}
                  alt={propertyImages[0].alt}
                  className="w-full h-full object-cover rounded-l-lg lg:rounded-l-2xl"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-l-lg lg:rounded-l-2xl"></div>
              </div>
              
              <div className="lg:col-span-2 grid grid-cols-2 gap-2">
                       {propertyImages.slice(1, 5).map((image: PropertyImage, index: number) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer"
                    onClick={() => propertyImages.length > 0 && openModal(index + 1)}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-r-lg lg:rounded-r-2xl"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-r-lg lg:rounded-r-2xl"></div>
                    
                    {index === 3 && propertyImages.length > 4 && (
                      <div className="absolute bottom-3 right-3">
                        <Button
                          size="sm"
                          className="bg-white/90 hover:bg-white text-gray-900 border border-gray-300 shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(0);
                          }}
                        >
                          <Expand className="h-4 w-4 mr-1" />
                          View all photos
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden rounded-lg lg:rounded-2xl">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <Grid3X3 className="h-8 w-8" />
                  </div>
                  <p className="text-lg">No images available</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="py-6 lg:py-10">
            <div className="text-white">
              <h1 className="lg:text-3xl text-xl font-bold mb-6 text-[#333333]">{property.name}</h1>
              <div className="flex items-center space-x-4 text-lg">
                <div className="flex items-center text-[#333333]">
                  <MapPin className="h-5 w-5 mr-1 text-[#333333]" />
                  {property.address}
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-1 text-yellow-400 fill-current" />
                  {property.averageRating.toFixed(1)}
                  <span className="text-gray-600 ml-1">({allReviews.length} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className=""
          >
            <div className="flex flex-wrap items-center gap-8 sm:gap-12">
              <div className="flex items-center space-x-4">
                <Users className="h-5 w-5 text-[#333333]" />
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-[#333333]">5</span>
                  <span className="text-[#5C5C5A] text-sm font-normal">Guests</span>
                </div>
              </div>


              <div className="flex items-center space-x-4">
                <Bed className="h-5 w-5 text-[#333333]" />
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-[#333333]">2</span>
                  <span className="text-[#5C5C5A] text-sm font-normal">Bedrooms</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Bath className="h-5 w-5 text-[#333333]" />
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-[#333333]">2</span>
                  <span className="text-[#5C5C5A] text-sm font-normal">Bathrooms</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Home className="h-5 w-5 text-[#333333]" />
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-[#333333]">3</span>
                  <span className="text-[#5C5C5A] text-sm font-normal">Beds</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>



        <PropertyInfo property={property} reviews={allReviews} />
      </div>

      <AnimatePresence>
        {isModalOpen && propertyImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-xl font-semibold text-gray-900">
                  {propertyImages[currentImageIndex].alt}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="relative">
                <img
                  src={propertyImages[currentImageIndex].url}
                  alt={propertyImages[currentImageIndex].alt}
                  className="w-full h-[60vh] object-cover"
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 shadow-lg"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 shadow-lg"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4 border-t">
                <div className="flex space-x-2 overflow-x-auto">
                         {propertyImages.map((image: PropertyImage, index: number) => (
                    <button
                      key={image.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
