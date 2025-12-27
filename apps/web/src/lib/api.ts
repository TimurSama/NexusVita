/**
 * API Client for Nexus Vita Backend
 * Handles all HTTP requests with authentication and error handling
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return {
          error: data?.message || `HTTP Error: ${response.status}`,
          status: response.status,
        };
      }

      return {
        data,
        status: response.status,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
        status: 0,
      };
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>) {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  async put<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  async patch<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  async delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { method: 'DELETE', ...options });
  }
}

// Create singleton instance
export const api = new ApiClient(API_BASE_URL);

// ============================================
// Auth API
// ============================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'USER' | 'TRAINER';
}

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
}

export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/login', credentials),

  register: (data: RegisterData) =>
    api.post<AuthResponse>('/auth/register', data),

  getMe: () => api.get<User>('/auth/me'),

  logout: () => {
    api.setToken(null);
    return Promise.resolve({ status: 200 });
  },
};

// ============================================
// User API
// ============================================

export interface Profile {
  id: string;
  userId: string;
  bio?: string;
  avatar?: string;
  height?: number;
  weight?: number;
  gender?: string;
  birthDate?: string;
  goals?: string[];
  specializations?: string[];
  certifications?: string[];
}

export const userApi = {
  getProfile: () => api.get<Profile>('/profiles/me'),

  updateProfile: (data: Partial<Profile>) =>
    api.put<Profile>('/profiles/me', data),

  getUserById: (id: string) => api.get<User>(`/users/${id}`),
};

// ============================================
// Workout API
// ============================================

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  muscleGroups?: string[];
  videoUrl?: string;
  imageUrl?: string;
  sets?: number;
  reps?: number;
  duration?: number;
}

export interface WorkoutProgram {
  id: string;
  trainerId: string;
  title: string;
  description?: string;
  difficulty: string;
  duration: number;
  priceTokens?: number;
  priceFiat?: number;
  exercises: Exercise[];
  createdAt: string;
}

export interface WorkoutRecord {
  id: string;
  userId: string;
  programId?: string;
  exerciseId?: string;
  date: string;
  duration?: number;
  repetitions?: number;
  weightUsed?: number;
  notes?: string;
}

export const workoutApi = {
  getPrograms: (trainerId?: string) =>
    api.get<WorkoutProgram[]>('/workouts/programs', { trainerId: trainerId || '' }),

  getProgram: (id: string) =>
    api.get<WorkoutProgram>(`/workouts/programs/${id}`),

  createProgram: (data: Partial<WorkoutProgram>) =>
    api.post<WorkoutProgram>('/workouts/programs', data),

  updateProgram: (id: string, data: Partial<WorkoutProgram>) =>
    api.put<WorkoutProgram>(`/workouts/programs/${id}`, data),

  deleteProgram: (id: string) =>
    api.delete(`/workouts/programs/${id}`),

  getRecords: () => api.get<WorkoutRecord[]>('/workouts/records'),

  createRecord: (data: Partial<WorkoutRecord>) =>
    api.post<WorkoutRecord>('/workouts/records', data),

  updateRecord: (id: string, data: Partial<WorkoutRecord>) =>
    api.put<WorkoutRecord>(`/workouts/records/${id}`, data),

  deleteRecord: (id: string) =>
    api.delete(`/workouts/records/${id}`),
};

// ============================================
// Nutrition API
// ============================================

export interface MealPlan {
  id: string;
  trainerId: string;
  title: string;
  description?: string;
  calories?: number;
  meals: MealItem[];
}

export interface MealItem {
  id: string;
  name: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  time?: string;
}

export const nutritionApi = {
  getPlans: () => api.get<MealPlan[]>('/nutrition/plans'),

  getPlan: (id: string) => api.get<MealPlan>(`/nutrition/plans/${id}`),

  createPlan: (data: Partial<MealPlan>) =>
    api.post<MealPlan>('/nutrition/plans', data),

  updatePlan: (id: string, data: Partial<MealPlan>) =>
    api.put<MealPlan>(`/nutrition/plans/${id}`, data),

  deletePlan: (id: string) =>
    api.delete(`/nutrition/plans/${id}`),
};

// ============================================
// Habits API
// ============================================

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  targetCount: number;
  currentStreak: number;
  longestStreak: number;
  category?: string;
  color?: string;
  icon?: string;
  isActive: boolean;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
  notes?: string;
}

export const habitApi = {
  getHabits: () => api.get<Habit[]>('/habits'),

  createHabit: (data: Partial<Habit>) =>
    api.post<Habit>('/habits', data),

  updateHabit: (id: string, data: Partial<Habit>) =>
    api.put<Habit>(`/habits/${id}`, data),

  deleteHabit: (id: string) =>
    api.delete(`/habits/${id}`),

  logCompletion: (id: string, data: { completed: boolean; notes?: string }) =>
    api.post<HabitLog>(`/habits/${id}/log`, data),
};

// ============================================
// Psychology API
// ============================================

export interface MoodEntry {
  id: string;
  userId: string;
  date: string;
  moodScore: number;
  energyLevel?: number;
  stressLevel?: number;
  notes?: string;
  tags?: string[];
}

export interface Meditation {
  id: string;
  title: string;
  description?: string;
  duration: number;
  category: string;
  audioUrl: string;
  imageUrl?: string;
  isPremium: boolean;
}

export const psychologyApi = {
  getMoodEntries: () => api.get<MoodEntry[]>('/psychology'),

  createMoodEntry: (data: Partial<MoodEntry>) =>
    api.post<MoodEntry>('/psychology', data),

  getMeditations: (category?: string) =>
    api.get<Meditation[]>('/psychology/meditations', { category: category || '' }),
};

// ============================================
// Education API
// ============================================

export interface Course {
  id: string;
  authorId: string;
  title: string;
  description?: string;
  category: string;
  difficulty: string;
  duration: number;
  priceTokens?: number;
  priceFiat?: number;
  lessons: Lesson[];
  imageUrl?: string;
  isPublished: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  order: number;
  duration: number;
}

export interface Article {
  id: string;
  authorId: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  imageUrl?: string;
  readTime: number;
  isPublished: boolean;
  createdAt: string;
}

export const educationApi = {
  getCourses: (category?: string) =>
    api.get<Course[]>('/education/courses', { category: category || '' }),

  getCourse: (id: string) => api.get<Course>(`/education/courses/${id}`),

  enrollInCourse: (id: string) =>
    api.post(`/education/courses/${id}/enroll`),

  getArticles: (category?: string) =>
    api.get<Article[]>('/education/content', { category: category || '' }),

  getArticle: (id: string) => api.get<Article>(`/education/content/${id}`),
};

// ============================================
// Social API
// ============================================

export interface Post {
  id: string;
  authorId: string;
  content: string;
  images?: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface Community {
  id: string;
  name: string;
  description?: string;
  category: string;
  memberCount: number;
  imageUrl?: string;
  isPrivate: boolean;
}

export const socialApi = {
  getFeed: (page?: number, limit?: number) =>
    api.get<Post[]>('/social/posts', { page: page || 1, limit: limit || 20 }),

  createPost: (data: { content: string; images?: string[] }) =>
    api.post<Post>('/social/posts', data),

  likePost: (id: string) => api.post(`/social/posts/${id}/likes`),

  unlikePost: (id: string) => api.delete(`/social/posts/${id}/likes`),

  getCommunities: () => api.get<Community[]>('/social/communities'),

  joinCommunity: (id: string) =>
    api.post(`/social/communities/${id}/join`),

  leaveCommunity: (id: string) =>
    api.post(`/social/communities/${id}/leave`),
};

// ============================================
// Challenge API
// ============================================

export interface Challenge {
  id: string;
  creatorId: string;
  title: string;
  description?: string;
  type: string;
  startDate: string;
  endDate: string;
  goal: number;
  rewardTokens?: number;
  participantsCount: number;
  imageUrl?: string;
  isActive: boolean;
}

export const challengeApi = {
  getChallenges: () => api.get<Challenge[]>('/challenges'),

  getChallenge: (id: string) => api.get<Challenge>(`/challenges/${id}`),

  joinChallenge: (id: string) =>
    api.post(`/challenges/${id}/join`),

  updateProgress: (id: string, progress: number) =>
    api.put(`/challenges/${id}/progress`, { progress }),
};

// ============================================
// Marketplace API
// ============================================

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  description?: string;
  category: string;
  priceTokens?: number;
  priceFiat?: number;
  images?: string[];
  isDigital: boolean;
  isNFT: boolean;
  stock?: number;
}

export interface Order {
  id: string;
  buyerId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export const marketplaceApi = {
  getProducts: (category?: string) =>
    api.get<Product[]>('/marketplace/products', { category: category || '' }),

  getProduct: (id: string) =>
    api.get<Product>(`/marketplace/products/${id}`),

  createOrder: (data: { productId: string; quantity: number; paymentMethod: string }) =>
    api.post<Order>('/marketplace/orders', data),

  getOrders: () => api.get<Order[]>('/marketplace/orders'),
};

// ============================================
// DAO API
// ============================================

export interface DAOProposal {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  category: string;
  status: 'PENDING' | 'ACTIVE' | 'PASSED' | 'REJECTED' | 'EXECUTED';
  votesFor: number;
  votesAgainst: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface TokenBalance {
  userId: string;
  balance: number;
  stakedBalance: number;
  pendingRewards: number;
}

export const daoApi = {
  getProposals: () => api.get<DAOProposal[]>('/dao/proposals'),

  getProposal: (id: string) => api.get<DAOProposal>(`/dao/proposals/${id}`),

  createProposal: (data: Partial<DAOProposal>) =>
    api.post<DAOProposal>('/dao/proposals', data),

  vote: (id: string, voteType: 'FOR' | 'AGAINST') =>
    api.post(`/dao/proposals/${id}/vote`, { voteType }),

  getTokenBalance: () => api.get<TokenBalance>('/tokens/balance'),

  stakeTokens: (amount: number) =>
    api.post('/tokens/stake', { amount }),

  unstakeTokens: (amount: number) =>
    api.post('/tokens/unstake', { amount }),
};

// ============================================
// Chat API
// ============================================

export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'TEXT' | 'IMAGE' | 'FILE';
  isRead: boolean;
  createdAt: string;
}

export const chatApi = {
  getChats: () => api.get<Chat[]>('/chat'),

  getMessages: (chatId: string, page?: number) =>
    api.get<Message[]>(`/chat/${chatId}/messages`, { page: page || 1 }),

  sendMessage: (chatId: string, content: string, type?: string) =>
    api.post<Message>(`/chat/${chatId}/messages`, { content, type: type || 'TEXT' }),

  createChat: (participantId: string) =>
    api.post<Chat>('/chat', { participantId }),
};

// ============================================
// Trainer API
// ============================================

export interface TrainerProfile {
  id: string;
  userId: string;
  displayName: string;
  slug: string;
  bio?: string;
  specializations: string[];
  certifications: string[];
  experience?: number;
  rating?: number;
  reviewsCount: number;
  priceRange?: string;
  availableForOnline: boolean;
  availableForOffline: boolean;
  locations?: string[];
  socialLinks?: Record<string, string>;
  gallery?: string[];
}

export const trainerApi = {
  getTrainers: (specialization?: string) =>
    api.get<TrainerProfile[]>('/trainers/profile', { specialization: specialization || '' }),

  getTrainer: (idOrSlug: string) =>
    api.get<TrainerProfile>(`/trainers/profile/${idOrSlug}`),

  getTrainerPage: (slug: string) =>
    api.get(`/trainers/page/${slug}`),

  createTrainerProfile: (data: Partial<TrainerProfile>) =>
    api.post<TrainerProfile>('/trainers/profile', data),

  updateTrainerProfile: (data: Partial<TrainerProfile>) =>
    api.put<TrainerProfile>('/trainers/profile', data),
};

// ============================================
// Telegram API
// ============================================

export const telegramApi = {
  authenticate: (initData: string) =>
    api.post<{ user: any; token: string }>('/telegram/mini-app/auth', { initData }),

  sendInvite: (data: { telegramId?: string; chatId?: number }) =>
    api.post('/telegram/invite/send', data),

  getReferralLink: () =>
    api.get<{
      code: string;
      telegramLink: string;
      webLink: string;
      shareText: string;
    }>('/telegram/referral-link'),

  connectAccount: (initData: string) =>
    api.post('/telegram/connect', { initData }),

  disconnectAccount: () =>
    api.delete('/telegram/disconnect'),

  getStatus: () =>
    api.get('/telegram/status'),
};

// ============================================
// Notification API
// ============================================

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  data?: Record<string, any>;
  createdAt: string;
}

export const notificationApi = {
  getNotifications: () => api.get<Notification[]>('/notifications'),

  markAsRead: (id: string) =>
    api.put(`/notifications/${id}/read`),

  markAllAsRead: () => api.put('/notifications/read-all'),

  deleteNotification: (id: string) =>
    api.delete(`/notifications/${id}`),
};

export default api;

