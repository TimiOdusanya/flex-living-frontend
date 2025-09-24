import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Wifi,
  Car,
  Coffee,
  Tv,
  Waves,
  CheckCircle,
  Star,
  Calendar,
  WashingMachine,
  Bath,
  Heater,
  Dumbbell,
  ChevronRight,
  Clock,
  Shield,
  CalendarClock,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import { NormalizedReview } from "@/types";
import LocationMap from "./location-map";

const PropertyInfo = ({
  property,
  reviews,
}: {
  property: Property;
  reviews: NormalizedReview[];
}) => {
  return (
    <section className="py-12 ">
      <div className="border-b border-gray-200 mb-8"></div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 rounded-lg border bg-card text-card-foreground shadow-sm p-4"
            >
              <h2 className="text-2xl font-semibold mb-4 text-[#333333]">
                About this property
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {property.description ||
                  "Experience luxury and comfort in this beautifully designed space. Perfect for both business and leisure travelers, this property offers all the amenities you need for a memorable stay."}
              </p>
            </motion.div>

            <div className="mb-8 rounded-lg border bg-card text-card-foreground shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold mb-4 text-[#333333]">
                  Amenities
                </h2>
                <Button
                  variant="outline"
                  className="text-sm font-medium text-gray-700"
                >
                  View all amenities <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <Users className="h-6 w-6" />, label: "4 guests" },
                  { icon: <Wifi className="h-6 w-6" />, label: "WiFi" },
                  { icon: <Car className="h-6 w-6" />, label: "Parking" },
                  { icon: <Coffee className="h-6 w-6" />, label: "Kitchen" },
                  { icon: <Tv className="h-6 w-6" />, label: "TV" },
                  {
                    icon: <WashingMachine className="h-6 w-6" />,
                    label: "Washing Machine",
                  },
                  { icon: <Waves className="h-6 w-6" />, label: "Pool" },
                  { icon: <Bath className="h-6 w-6" />, label: "Hot Tub" },
                  { icon: <Heater className="h-6 w-6" />, label: "Sauna" },
                  { icon: <Dumbbell className="h-6 w-6" />, label: "Gym" },
                ].map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 bg-[#F1F3EE] rounded-lg"
                  >
                    <div className="text-[#284E4C]">{amenity.icon}</div>
                    <span className="text-sm font-medium text-gray-700">
                      {amenity.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 rounded-lg border bg-card text-card-foreground shadow-sm p-4"
            >
              <h2 className="text-2xl font-semibold mb-4 text-[#333333]">
                Stay Policies
              </h2>

              <div className="flex flex-col gap-4 bg-[#F1F3EE] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full">
                    <Clock className="h-5 w-5 text-[#284E4C]" />
                  </div>
                  <h3 className="font-semibold text-lg text-[#333333]">
                    Check-in &amp; Check-out
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-[#5C5C5A]">Check-in Time</p>
                    <p className="font-semibold text-lg text-[#333333]">
                      3:00 PM
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-[#5C5C5A]">Check-out Time</p>
                    <p className="font-semibold text-lg text-[#333333]">
                      10:00 AM
                    </p>
                  </div>
                </div>
              </div>

              {property.houseRules && property.houseRules.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-8 rounded-lg bg-[#F1F3EE] text-card-foreground px-4 py-6 mt-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full">
                      <Shield className="h-5 w-5 text-[#284E4C]" />
                    </div>
                    <h3 className="font-semibold text-lg text-[#333333]">
                      House Rules
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.houseRules.map((rule, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 flex items-center gap-3 bg-white rounded-lg p-4"
                      >
                        <CheckCircle className="h-5 w-5 text-[#284E4C] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">
                          {rule}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="flex flex-col gap-4 bg-[#F1F3EE] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full">
                    <CalendarClock className="h-5 w-5 text-[#284E4C]" />
                  </div>
                  <h3 className="font-semibold text-lg text-[#333333]">
                    Cancellation Policy
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-medium mb-2 text-[#333333] text-lg">
                      For stays less than 28 days
                    </p>
                    <ul className="list-disc list-inside">
                      <li className="text-[#284E4C] rounded-full mt-1.5 order-first">
                        Full refund up to 14 days before check-in
                      </li>
                      <li className="text-[#284E4C] rounded-full mt-1.5 order-first">
                        No refund for bookings less than 14 days before check-in
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-medium mb-2 text-[#333333] text-lg">
                      For stays of 28 days or more
                    </p>
                    <ul className="list-disc list-inside">
                      <li className="text-[#284E4C] rounded-full mt-1.5 order-first">
                        Full refund up to 30 days before check-in
                      </li>
                      <li className="text-[#284E4C] rounded-full mt-1.5 order-first">
                        No refund for bookings less than 30 days before check-in
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Guest Reviews
                </h2>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-xl font-semibold">
                    {property.averageRating.toFixed(1)}
                  </span>
                  <span className="text-gray-600">
                    ({reviews.length} reviews)
                  </span>
                </div>
              </div>

              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={`${review.channel}-${review.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className={review.channel === 'google' ? 'border-l-4 border-l-blue-500' : ''}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                review.channel === 'google' 
                                  ? 'bg-blue-100' 
                                  : 'bg-green-100'
                              }`}>
                                <span className={`font-semibold ${
                                  review.channel === 'google' 
                                    ? 'text-blue-600' 
                                    : 'text-green-600'
                                }`}>
                                  {review.guestName.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold text-gray-900">
                                    {review.guestName}
                                  </h3>
                                  {review.channel === 'google' && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                      Google
                                    </span>
                                  )}
                                  {review.channel === 'hostaway' && (
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                      Hostaway
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(review.overallRating / 2)
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-sm text-gray-600 ml-1">
                                    {review.overallRating.toFixed(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Calendar className="h-4 w-4" />
                              {/* <span>{review.submittedAt.toLocaleDateString()}</span> */}
                            </div>
                          </div>

                          <p className="text-gray-800 mb-4">
                            {review.publicReview}
                          </p>

                          {review.categories && Object.values(review.categories).some(rating => rating > 0) && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              {Object.entries(review.categories).map(
                                ([category, rating]) => (
                                  <div
                                    key={category}
                                    className="flex justify-between"
                                  >
                                    <span className="text-gray-600 capitalize">
                                      {category.replace("_", " ")}:
                                    </span>
                                    <span className="font-medium">
                                      {rating}/10
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <Star className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No reviews yet
                    </h3>
                    <p className="text-gray-600">
                      Be the first to review this property!
                    </p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
           <LocationMap />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-24"
            >
              <Card className="shadow-lg">
                <CardHeader className="bg-[#284E4C] border-t rounded-t-xl">
                  <CardTitle className="text-white">
                  Book Your Stay
                  </CardTitle>
                  <span className="text-white text-sm">Select dates to see prices</span>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        {property.price?.currency || "$"}
                        {property.price?.perNight || 299}
                      </span>
                      <span className="text-gray-600"> / night</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">
                        {property.averageRating.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-600">
                        ({reviews.length})
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Check-in
                        </label>
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Check-out
                        </label>
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Guests
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                        <option>1 guest</option>
                        <option>2 guests</option>
                        <option>3 guests</option>
                        <option>4 guests</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-4">
                      <Button className="w-full bg-[#284E4C] hover:bg-[#284E4C]/90 text-white py-3 flex items-center gap-2 justify-center h-12">
                      <CalendarCheck className="h-4 w-4 text-white" />
                        <span>Check availability</span>
                      </Button>
                      <Button className="w-full bg-white text-black py-3 border border-[#284E4C]/20 text-[#284E4C] hover:bg-[#284E4C]/5 h-12">
                      <MessageCircle className="h-4 w-4 text-[#284E4C]" />
                        <span>Send Inquiry</span>
                      </Button>
                    </div>

                    <div className="text-center text-sm text-gray-600 flex items-center gap-2 justify-center">
                        <Shield className="h-5 w-5 text-[#284E4C]" />
                     <span className="text-sm text-gray-600">Instant booking confirmation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyInfo;
