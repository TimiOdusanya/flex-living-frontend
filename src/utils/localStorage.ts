// Local Storage utility for review approvals
import { NormalizedReview } from '@/types';

interface ApprovalRecord {
  id: number;
  status: 'approved' | 'rejected' | 'pending';
  lastUpdated: string;
}

export class ReviewStorage {
  private static readonly APPROVAL_KEY = 'review_approvals';
  private static readonly REVIEWS_KEY = 'cached_reviews';


  static getApprovalStatus(reviewId: number): 'approved' | 'rejected' | 'pending' {
    try {
      const approvals = this.getApprovals();
      const approval = approvals.find(a => a.id === reviewId);
      return approval?.status || 'pending';
    } catch (error) {
      console.error('Error getting approval status:', error);
      return 'pending';
    }
  }


  static setApprovalStatus(reviewId: number, status: 'approved' | 'rejected'): void {
    try {
      const approvals = this.getApprovals();
      const existingIndex = approvals.findIndex(a => a.id === reviewId);
      
      const newApproval = {
        id: reviewId,
        status,
        lastUpdated: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        approvals[existingIndex] = newApproval;
      } else {
        approvals.push(newApproval);
      }

      localStorage.setItem(this.APPROVAL_KEY, JSON.stringify(approvals));
    } catch (error) {
      console.error('Error setting approval status:', error);
    }
  }

 
  private static getApprovals(): ApprovalRecord[] {
    try {
      const data = localStorage.getItem(this.APPROVAL_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error parsing approvals from localStorage:', error);
      return [];
    }
  }

  static clearApprovals(): void {
    localStorage.removeItem(this.APPROVAL_KEY);
  }


  static getApprovedReviewIds(): number[] {
    return this.getApprovals()
      .filter(a => a.status === 'approved')
      .map(a => a.id);
  }


  static cacheReviews(reviews: NormalizedReview[]): void {
    try {
      localStorage.setItem(this.REVIEWS_KEY, JSON.stringify({
        reviews,
        lastUpdated: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error caching reviews:', error);
    }
  }


  static getCachedReviews(): NormalizedReview[] {
    try {
      const data = localStorage.getItem(this.REVIEWS_KEY);
      return data ? JSON.parse(data).reviews : [];
    } catch (error) {
      console.error('Error getting cached reviews:', error);
      return [];
    }
  }
}
