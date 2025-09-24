"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { useAuthStore } from "@/store/authStore";
import { useApproveReview, useRejectReview, useReviews, useDashboardStats } from '@/hooks/api';
import { useRouter } from "next/navigation";
import {
  Star,
  CheckCircle,
  Users,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Activity,
  MapPin,
  RefreshCw,
  Download,
  Globe,
} from "lucide-react";
import { NormalizedReview } from "@/types";
import { ReviewQueryParams } from "@/services/reviews.service";
import TabContent from "@/components/manager-dashboard/tab-content";

export default function ManagerDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [filters, setFilters] = useState<ReviewQueryParams>({});
  const [approvingReviews, setApprovingReviews] = useState<Set<number>>(new Set());
  const [rejectingReviews, setRejectingReviews] = useState<Set<number>>(new Set());

  const { data: reviewsResponse, isLoading: reviewsLoading, error: reviewsError, refetch: refetchReviews } = useReviews(filters);
  const { data: statsResponse, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useDashboardStats();

  const reviews = reviewsResponse?.data || [];
  const stats = statsResponse?.data;

  const approveReviewMutation = useApproveReview();
  const rejectReviewMutation = useRejectReview();

  useEffect(() => {
    if (!user) {
      router.push("/manager/login");
      return;
    }
  }, [user, router]);

  const handleApproveReview = async (reviewId: number) => {
    try {
      setApprovingReviews(prev => new Set(prev).add(reviewId));
      await approveReviewMutation.mutateAsync({ reviewId });
      refetchReviews();
    } catch (error) {
      console.error("Error approving review:", error);
    } finally {
      setApprovingReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    }
  };

  const handleRejectReview = async (reviewId: number) => {
    try {
      setRejectingReviews(prev => new Set(prev).add(reviewId));
      await rejectReviewMutation.mutateAsync({ reviewId });
      refetchReviews();
    } catch (error) {
      console.error("Error rejecting review:", error);
    } finally {
      setRejectingReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    }
  };

  const handleFilterChange = (newFilters: Partial<ReviewQueryParams>) => {
    setFilters({ ...filters, ...newFilters });
   
  };

  const filteredReviews = reviews.filter(
    (review: NormalizedReview) =>
      review.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.listingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.publicReview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loading = reviewsLoading || statsLoading;
  const error = reviewsError || statsError;

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">Unable to fetch dashboard data. Please try again.</p>
          <Button onClick={() => { refetchReviews(); refetchStats(); }}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF6]">
      <DashboardNavbar
        onSearch={setSearchTerm}
        searchPlaceholder="Search reviews, properties, guests..."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Here&apos;s what&apos;s happening with your properties today
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button variant="outline" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button className="bg-[#284E4C] hover:bg-[#284E4C]/90">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </motion.div>

        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600 mb-1">
                        Total Reviews
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.totalReviews}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600 font-medium">
                          +12%
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          vs last month
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-500 rounded-xl">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-1">
                        Average Rating
                      </p>
                      <div className="flex items-center">
                        <p className="text-3xl font-bold text-gray-900 mr-2">
                          {stats.averageRating.toFixed(1)}
                        </p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(stats.averageRating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600 font-medium">
                          +0.3
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          vs last month
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-green-500 rounded-xl">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600 mb-1">
                        Approved Reviews
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.approvedReviews}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-yellow-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${
                                (stats.approvedReviews / stats.totalReviews) *
                                100
                              }%`,
                            }}
                            transition={{ duration: 1, delay: 0.5 }}
                          ></motion.div>
                        </div>
                        <span className="text-sm text-gray-500 ml-2">
                          {Math.round(
                            (stats.approvedReviews / stats.totalReviews) * 100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-yellow-500 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600 mb-1">
                        Properties
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.propertiesCount}
                      </p>
                      <div className="flex items-center mt-2">
                        <MapPin className="h-4 w-4 text-purple-500 mr-1" />
                        <span className="text-sm text-gray-500">
                          Active listings
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-purple-500 rounded-xl">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "reviews", label: "Reviews", icon: MessageSquare },
              { id: "analytics", label: "Analytics", icon: Activity },
              { id: "properties", label: "Properties", icon: Globe },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedTab === tab.id
                    ? "bg-white text-[#284E4C] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        <TabContent
          selectedTab={selectedTab}
          handleFilterChange={handleFilterChange}
          handleApproveReview={handleApproveReview}
          handleRejectReview={handleRejectReview}
          filteredReviews={filteredReviews}
          filters={filters}
          loading={loading}
          setLoading={() => {}}
          updateReview={() => {}}
          stats={stats || {
            totalReviews: 0,
            approvedReviews: 0,
            propertiesCount: 0,
            averageRating: 0,
            pendingReviews: 0,
            recentReviews: [],
            topPerformingProperties: [],
            ratingDistribution: [],
          }}
          reviews={filteredReviews}
          approvingReviews={approvingReviews}
          rejectingReviews={rejectingReviews}
        />
      </div>
    </div>
  );
}
