import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { authMiddleware, optionalAuth, AuthRequest } from '../middleware/auth.js';
import { LocationService } from '../services/location.service.js';

const router = Router();
const locationService = new LocationService();

// Validation schemas
const createLocationSchema = z.object({
  name: z.string().min(3).max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/),
  description: z.string().max(5000).optional(),
  type: z.enum(['GYM', 'FITNESS_CENTER', 'YOGA_STUDIO', 'MEDICAL_CENTER', 'SPA', 'POOL', 'SPORTS_COMPLEX', 'OUTDOOR', 'HOME']),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  postalCode: z.string().optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  images: z.array(z.string().url()).optional(),
  coverImageUrl: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  workingHours: z.record(z.object({
    open: z.string(),
    close: z.string(),
  })).optional(),
  amenities: z.array(z.string()).optional(),
});

const createSubscriptionSchema = z.object({
  locationId: z.string().uuid(),
  title: z.string().min(3).max(200),
  description: z.string().max(2000).optional(),
  duration: z.number().int().positive(),
  durationType: z.enum(['days', 'months', 'year']),
  priceFiat: z.number().positive(),
  priceTokens: z.number().positive().optional(),
  visitsLimit: z.number().int().positive().optional(),
  nfcEnabled: z.boolean().optional(),
  qrEnabled: z.boolean().optional(),
  includedAmenities: z.array(z.string()).optional(),
});

/**
 * @route GET /api/locations
 * @desc Get all locations
 */
router.get('/', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const { type, city, amenities, lat, lng, radius, search, page, limit, sort } = req.query;
    const locations = await locationService.getLocations({
      type: type as string,
      city: city as string,
      amenities: amenities ? (amenities as string).split(',') : undefined,
      lat: lat ? parseFloat(lat as string) : undefined,
      lng: lng ? parseFloat(lng as string) : undefined,
      radius: radius ? parseInt(radius as string) : undefined,
      search: search as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
      sort: sort as string,
    });
    res.json(locations);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/locations/nearby
 * @desc Get nearby locations
 */
router.get('/nearby', async (req, res, next) => {
  try {
    const { lat, lng, radius, type, limit } = req.query;
    const locations = await locationService.getNearbyLocations({
      lat: parseFloat(lat as string),
      lng: parseFloat(lng as string),
      radius: parseInt(radius as string) || 5000,
      type: type as string,
      limit: parseInt(limit as string) || 20,
    });
    res.json(locations);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/locations/:slug
 * @desc Get location by slug
 */
router.get('/:slug', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const location = await locationService.getLocationBySlug(req.params.slug, req.user?.id);
    res.json(location);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/locations
 * @desc Create location
 */
router.post('/', authMiddleware, validate(createLocationSchema), async (req: AuthRequest, res, next) => {
  try {
    const location = await locationService.createLocation(req.user!.id, req.body);
    res.status(201).json(location);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /api/locations/:id
 * @desc Update location
 */
router.patch('/:id', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const location = await locationService.updateLocation(req.params.id, req.user!.id, req.body);
    res.json(location);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/locations/:id/subscriptions
 * @desc Get location subscriptions
 */
router.get('/:id/subscriptions', async (req, res, next) => {
  try {
    const subscriptions = await locationService.getLocationSubscriptions(req.params.id);
    res.json(subscriptions);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/locations/subscriptions
 * @desc Create subscription plan
 */
router.post(
  '/subscriptions',
  authMiddleware,
  validate(createSubscriptionSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const subscription = await locationService.createSubscription(req.user!.id, req.body);
      res.status(201).json(subscription);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route POST /api/locations/subscriptions/:id/purchase
 * @desc Purchase subscription
 */
router.post('/subscriptions/:id/purchase', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { paymentMethod, startDate } = req.body;
    const access = await locationService.purchaseSubscription(
      req.params.id,
      req.user!.id,
      paymentMethod,
      startDate
    );
    res.status(201).json(access);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/locations/my-access
 * @desc Get user's location access
 */
router.get('/my/access', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const access = await locationService.getUserAccess(req.user!.id);
    res.json(access);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/locations/checkin
 * @desc Check in to location
 */
router.post('/checkin', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { accessCode, method } = req.body;
    const visit = await locationService.checkIn(req.user!.id, accessCode, method);
    res.json(visit);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/locations/checkout
 * @desc Check out from location
 */
router.post('/checkout', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { visitId } = req.body;
    const visit = await locationService.checkOut(req.user!.id, visitId);
    res.json(visit);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/locations/:id/trainers
 * @desc Get location trainers
 */
router.get('/:id/trainers', async (req, res, next) => {
  try {
    const trainers = await locationService.getLocationTrainers(req.params.id);
    res.json(trainers);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/locations/:id/reviews
 * @desc Get location reviews
 */
router.get('/:id/reviews', async (req, res, next) => {
  try {
    const { page, limit, sort } = req.query;
    const reviews = await locationService.getLocationReviews(req.params.id, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
      sort: sort as string,
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/locations/:id/review
 * @desc Add location review
 */
router.post('/:id/review', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { rating, title, content, mediaUrls } = req.body;
    const review = await locationService.addReview(req.params.id, req.user!.id, {
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
 * @route GET /api/locations/visits/history
 * @desc Get visit history
 */
router.get('/visits/history', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { page, limit, locationId } = req.query;
    const visits = await locationService.getVisitHistory(req.user!.id, {
      locationId: locationId as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 30,
    });
    res.json(visits);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/locations/types
 * @desc Get location types
 */
router.get('/types/all', async (req, res, next) => {
  try {
    const types = await locationService.getLocationTypes();
    res.json(types);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/locations/amenities
 * @desc Get all amenities
 */
router.get('/amenities/all', async (req, res, next) => {
  try {
    const amenities = await locationService.getAmenities();
    res.json(amenities);
  } catch (error) {
    next(error);
  }
});

export default router;



