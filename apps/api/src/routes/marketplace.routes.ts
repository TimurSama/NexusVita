import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { authMiddleware, optionalAuth, AuthRequest, requireTrainer } from '../middleware/auth.js';
import { MarketplaceService } from '../services/marketplace.service.js';

const router = Router();
const marketplaceService = new MarketplaceService();

// Validation schemas
const createProductSchema = z.object({
  name: z.string().min(3).max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/),
  description: z.string().max(10000).optional(),
  shortDescription: z.string().max(500).optional(),
  type: z.enum(['PHYSICAL', 'DIGITAL', 'SERVICE', 'SUBSCRIPTION', 'NFT']),
  category: z.enum([
    'WORKOUT_PROGRAM', 'MEAL_PLAN', 'COURSE', 'CONSULTATION',
    'EQUIPMENT', 'SUPPLEMENTS', 'CLOTHING', 'ACCESSORIES', 'GIFT_CARD', 'OTHER'
  ]),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
  thumbnailUrl: z.string().url().optional(),
  priceFiat: z.number().positive(),
  priceTokens: z.number().positive().optional(),
  discountPercent: z.number().min(0).max(100).optional(),
  discountEndsAt: z.string().datetime().optional(),
  stock: z.number().int().nonnegative().optional(),
  sku: z.string().optional(),
  weight: z.number().positive().optional(),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
  }).optional(),
  digitalAssetUrl: z.string().url().optional(),
  subscriptionPeriod: z.string().optional(),
});

const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
  })),
  paymentMethod: z.enum(['card', 'tokens', 'mixed']),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
    postalCode: z.string(),
    phone: z.string().optional(),
  }).optional(),
  discountCode: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

const createDiscountSchema = z.object({
  code: z.string().min(3).max(50),
  description: z.string().max(500).optional(),
  discountType: z.enum(['percentage', 'fixed', 'tokens']),
  value: z.number().positive(),
  minOrderAmount: z.number().positive().optional(),
  maxDiscount: z.number().positive().optional(),
  usageLimit: z.number().int().positive().optional(),
  usageLimitPerUser: z.number().int().positive().optional(),
  applicableProducts: z.array(z.string().uuid()).optional(),
  startsAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
});

// Product routes
/**
 * @route GET /api/marketplace/products
 * @desc Get all products
 */
router.get('/products', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const { category, type, minPrice, maxPrice, search, page, limit, sort } = req.query;
    const products = await marketplaceService.getProducts({
      category: category as string,
      type: type as string,
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
      search: search as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
      sort: sort as string,
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/marketplace/products/:slug
 * @desc Get product by slug
 */
router.get('/products/:slug', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const product = await marketplaceService.getProductBySlug(req.params.slug);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/marketplace/products
 * @desc Create product (seller only)
 */
router.post(
  '/products',
  authMiddleware,
  requireTrainer,
  validate(createProductSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const product = await marketplaceService.createProduct(req.user!.id, req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route PATCH /api/marketplace/products/:id
 * @desc Update product
 */
router.patch('/products/:id', authMiddleware, requireTrainer, async (req: AuthRequest, res, next) => {
  try {
    const product = await marketplaceService.updateProduct(req.params.id, req.user!.id, req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/marketplace/products/:id
 * @desc Delete product
 */
router.delete('/products/:id', authMiddleware, requireTrainer, async (req: AuthRequest, res, next) => {
  try {
    await marketplaceService.deleteProduct(req.params.id, req.user!.id);
    res.json({ message: 'Товар удален' });
  } catch (error) {
    next(error);
  }
});

// Order routes
/**
 * @route POST /api/marketplace/orders
 * @desc Create order
 */
router.post('/orders', authMiddleware, validate(createOrderSchema), async (req: AuthRequest, res, next) => {
  try {
    const order = await marketplaceService.createOrder(req.user!.id, req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/marketplace/orders
 * @desc Get user's orders
 */
router.get('/orders', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { status, page, limit } = req.query;
    const orders = await marketplaceService.getUserOrders(req.user!.id, {
      status: status as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/marketplace/orders/:id
 * @desc Get order by ID
 */
router.get('/orders/:id', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const order = await marketplaceService.getOrderById(req.params.id, req.user!.id);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/marketplace/orders/:id/cancel
 * @desc Cancel order
 */
router.post('/orders/:id/cancel', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await marketplaceService.cancelOrder(req.params.id, req.user!.id);
    res.json({ message: 'Заказ отменен' });
  } catch (error) {
    next(error);
  }
});

// Seller routes
/**
 * @route GET /api/marketplace/seller/products
 * @desc Get seller's products
 */
router.get('/seller/products', authMiddleware, requireTrainer, async (req: AuthRequest, res, next) => {
  try {
    const products = await marketplaceService.getSellerProducts(req.user!.id);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/marketplace/seller/orders
 * @desc Get seller's received orders
 */
router.get('/seller/orders', authMiddleware, requireTrainer, async (req: AuthRequest, res, next) => {
  try {
    const { status, page, limit } = req.query;
    const orders = await marketplaceService.getSellerOrders(req.user!.id, {
      status: status as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /api/marketplace/seller/orders/:id
 * @desc Update order status (seller)
 */
router.patch('/seller/orders/:id', authMiddleware, requireTrainer, async (req: AuthRequest, res, next) => {
  try {
    const { status, trackingNumber } = req.body;
    const order = await marketplaceService.updateOrderStatus(
      req.params.id,
      req.user!.id,
      status,
      trackingNumber
    );
    res.json(order);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/marketplace/seller/stats
 * @desc Get seller statistics
 */
router.get('/seller/stats', authMiddleware, requireTrainer, async (req: AuthRequest, res, next) => {
  try {
    const stats = await marketplaceService.getSellerStats(req.user!.id);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

// Discount routes
/**
 * @route POST /api/marketplace/discounts
 * @desc Create discount code
 */
router.post(
  '/discounts',
  authMiddleware,
  requireTrainer,
  validate(createDiscountSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const discount = await marketplaceService.createDiscount(req.user!.id, req.body);
      res.status(201).json(discount);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route POST /api/marketplace/discounts/validate
 * @desc Validate discount code
 */
router.post('/discounts/validate', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { code, items } = req.body;
    const result = await marketplaceService.validateDiscount(code, items, req.user!.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/marketplace/categories
 * @desc Get all categories
 */
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await marketplaceService.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/marketplace/products/:id/review
 * @desc Add product review
 */
router.post('/products/:id/review', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { rating, title, content, mediaUrls } = req.body;
    const review = await marketplaceService.addReview(req.params.id, req.user!.id, {
      rating,
      title,
      content,
      mediaUrls,
    });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/marketplace/products/:id/reviews
 * @desc Get product reviews
 */
router.get('/products/:id/reviews', async (req, res, next) => {
  try {
    const { page, limit, sort } = req.query;
    const reviews = await marketplaceService.getProductReviews(req.params.id, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
      sort: sort as string,
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

export default router;



