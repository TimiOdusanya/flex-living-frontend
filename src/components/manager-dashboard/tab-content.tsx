import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Activity,
  BarChart3,
  TrendingUp,
  Filter as FilterIcon,
} from "lucide-react";
import { MessageSquare, CheckCircle, RefreshCw, Users } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Star,
  Clock,
  Globe,
  Download,
  ThumbsUp,
  CheckCircle2,
  XCircle,
  Zap,
  Target,
} from "lucide-react";
import { ReviewFilters } from "@/types";
import { NormalizedReview } from "@/types";
import { DashboardStats } from "@/types";

const TabContent = ({
  selectedTab,
  handleFilterChange,
  handleApproveReview,
  handleRejectReview,
  filters,
  loading,
  stats,
  reviews,
}: {
  selectedTab: string;
  handleFilterChange: (newFilters: Partial<ReviewFilters>) => void;
  handleApproveReview: (reviewId: number) => void;
  handleRejectReview: (reviewId: number) => void;
  filteredReviews: NormalizedReview[];
  filters: ReviewFilters;
  loading: boolean;
  reviews: NormalizedReview[];
  stats: DashboardStats;
  setLoading: (loading: boolean) => void;
  updateReview: (reviewId: number, review: NormalizedReview) => void;
}) => {
  return (
    <AnimatePresence mode="wait">
      {selectedTab === "overview" && (
        <motion.div
          key="overview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-[#284E4C]" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "New review received",
                    property: "Luxury Loft Manhattan",
                    time: "2 min ago",
                    type: "review",
                  },
                  {
                    action: "Review approved",
                    property: "Cozy Studio Paris",
                    time: "15 min ago",
                    type: "approve",
                  },
                  {
                    action: "Property updated",
                    property: "Modern Apartment London",
                    time: "1 hour ago",
                    type: "update",
                  },
                  {
                    action: "Guest checked in",
                    property: "Beach House Lisbon",
                    time: "2 hours ago",
                    type: "checkin",
                  },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-full ${
                        activity.type === "review"
                          ? "bg-blue-100"
                          : activity.type === "approve"
                          ? "bg-green-100"
                          : activity.type === "update"
                          ? "bg-yellow-100"
                          : "bg-purple-100"
                      }`}
                    >
                      {activity.type === "review" && (
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      )}
                      {activity.type === "approve" && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      {activity.type === "update" && (
                        <RefreshCw className="h-4 w-4 text-yellow-600" />
                      )}
                      {activity.type === "checkin" && (
                        <Users className="h-4 w-4 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.property}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {activity.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-[#284E4C]" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Approve Reviews",
                    icon: ThumbsUp,
                    color: "green",
                    count: stats?.pendingReviews || 0,
                  },
                  {
                    label: "View Properties",
                    icon: Globe,
                    color: "blue",
                    count: stats?.propertiesCount || 0,
                  },
                  {
                    label: "Export Data",
                    icon: Download,
                    color: "purple",
                    count: null,
                  },
                  {
                    label: "Settings",
                    icon: Target,
                    color: "yellow",
                    count: null,
                  },
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-lg border-2 border-dashed border-${action.color}-200 hover:border-${action.color}-400 hover:bg-${action.color}-50 transition-all duration-200 text-left`}
                  >
                    <div
                      className={`p-2 rounded-lg bg-${action.color}-100 w-fit mb-3`}
                    >
                      <action.icon
                        className={`h-5 w-5 text-${action.color}-600`}
                      />
                    </div>
                    <p className="font-medium text-gray-900 mb-1">
                      {action.label}
                    </p>
                    {action.count !== null && (
                      <p className="text-sm text-gray-500">
                        {action.count} items
                      </p>
                    )}
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {selectedTab === "reviews" && (
        <motion.div
          key="reviews"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FilterIcon className="h-5 w-5 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="rating">Minimum Rating</Label>
                  <select
                    id="rating"
                    value={filters.rating || ""}
                    onChange={(e) =>
                      handleFilterChange({
                        rating: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Ratings</option>
                    <option value="1">1+ Stars</option>
                    <option value="2">2+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="5">5+ Stars</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="channel">Channel</Label>
                  <select
                    id="channel"
                    value={filters.channel || ""}
                    onChange={(e) =>
                      handleFilterChange({
                        channel: e.target.value || undefined,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Channels</option>
                    <option value="hostaway">Hostaway</option>
                    <option value="google">Google</option>
                    <option value="airbnb">Airbnb</option>
                    <option value="booking">Booking.com</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={filters.status || ""}
                    onChange={(e) =>
                      handleFilterChange({
                        status: e.target.value || undefined,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Status</option>
                    <option value="published">Published</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
              <CardDescription>
                Manage and moderate guest reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#284E4C]"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.slice(0, 10).map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">
                                {review.guestName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {review.guestName}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {review.listingName}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 mb-2">
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
                            <span className="text-sm text-gray-600 ml-2">
                              {review.overallRating.toFixed(1)}/10
                            </span>
                          </div>

                          <p className="text-gray-700 mb-3">
                            {review.publicReview}
                          </p>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {/* {review.submittedAt.toLocaleDateString()} */}
                            </span>
                            <span className="flex items-center">
                              <Globe className="h-4 w-4 mr-1" />
                              {review.channel}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            size="sm"
                            onClick={() => handleApproveReview(review.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectReview(review.id)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {selectedTab === "analytics" && (
        <motion.div
          key="analytics"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-[#284E4C]" />
                  Rating Distribution
                </CardTitle>
                <CardDescription>
                  Breakdown of reviews by rating
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[5, 4, 3, 2, 1].map((rating, index) => {
                    const count = Math.floor(Math.random() * 20) + 5;
                    const percentage = (count / 50) * 100;
                    return (
                      <motion.div
                        key={rating}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="flex items-center space-x-1 w-8">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{rating}</span>
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{
                              duration: 1,
                              delay: index * 0.1 + 0.5,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">
                          {count}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-[#284E4C]" />
                  Channel Performance
                </CardTitle>
                <CardDescription>Reviews by source channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { channel: "Hostaway", count: 45, color: "bg-blue-500" },
                    { channel: "Google", count: 32, color: "bg-green-500" },
                    { channel: "Airbnb", count: 28, color: "bg-pink-500" },
                    {
                      channel: "Booking.com",
                      count: 15,
                      color: "bg-purple-500",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.channel}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="font-medium">{item.channel}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {item.count}
                        </span>
                        <span className="text-sm text-gray-500">reviews</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-[#284E4C]" />
                Monthly Trends
              </CardTitle>
              <CardDescription>
                Review volume and rating trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {Array.from({ length: 12 }, (_, i) => {
                  const height = Math.floor(Math.random() * 100) + 20;
                  return (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="bg-gradient-to-t from-[#284E4C] to-blue-400 rounded-t-lg flex-1 hover:from-blue-600 hover:to-purple-500 transition-all duration-300"
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-500">
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {selectedTab === "properties" && (
        <motion.div
          key="properties"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                name: "Luxury Loft Manhattan",
                location: "New York, NY",
                rating: 4.8,
                reviews: 124,
                revenue: "$45,230",
                occupancy: 92,
                image: "/images/luxury-loft.jpg",
              },
              {
                id: 2,
                name: "Cozy Studio Paris",
                location: "Paris, France",
                rating: 4.6,
                reviews: 89,
                revenue: "$32,150",
                occupancy: 87,
                image: "/images/cozy-studio.jpg",
              },
              {
                id: 3,
                name: "Modern Apartment London",
                location: "London, UK",
                rating: 4.9,
                reviews: 156,
                revenue: "$52,890",
                occupancy: 95,
                image: "/images/modern-apartment.jpg",
              },
              {
                id: 4,
                name: "Beach House Lisbon",
                location: "Lisbon, Portugal",
                rating: 4.7,
                reviews: 78,
                revenue: "$28,450",
                occupancy: 83,
                image: "/images/beach-house.jpg",
              },
              {
                id: 5,
                name: "City Center Berlin",
                location: "Berlin, Germany",
                rating: 4.5,
                reviews: 67,
                revenue: "$24,780",
                occupancy: 79,
                image: "/images/city-center.jpg",
              },
              {
                id: 6,
                name: "Mountain View Barcelona",
                location: "Barcelona, Spain",
                rating: 4.8,
                reviews: 98,
                revenue: "$35,620",
                occupancy: 88,
                image: "/images/mountain-view.jpg",
              },
            ].map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 relative">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">
                        {property.rating}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-bold text-lg">{property.name}</h3>
                      <p className="text-sm opacity-90">{property.location}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Reviews</span>
                        <span className="font-semibold">
                          {property.reviews}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Revenue</span>
                        <span className="font-semibold text-green-600">
                          {property.revenue}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Occupancy</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${property.occupancy}%` }}
                              transition={{
                                duration: 1,
                                delay: index * 0.1 + 0.5,
                              }}
                            />
                          </div>
                          <span className="font-semibold text-sm">
                            {property.occupancy}%
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-[#284E4C] hover:bg-[#284E4C]/90"
                        >
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-[#284E4C]" />
                Property Performance Summary
              </CardTitle>
              <CardDescription>
                Key metrics across all properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#284E4C] mb-2">
                    6
                  </div>
                  <div className="text-sm text-gray-600">Total Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    $218,120
                  </div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    612
                  </div>
                  <div className="text-sm text-gray-600">Total Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    87%
                  </div>
                  <div className="text-sm text-gray-600">Avg Occupancy</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TabContent;
