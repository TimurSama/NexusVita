import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { authMiddleware, optionalAuth, AuthRequest } from '../middleware/auth.js';
import { SocialService } from '../services/social.service.js';

const router = Router();
const socialService = new SocialService();

// Validation schemas
const createPostSchema = z.object({
  type: z.enum(['TEXT', 'IMAGE', 'VIDEO', 'STORY', 'POLL', 'WORKOUT_SHARE', 'ACHIEVEMENT_SHARE', 'MEAL_SHARE']).optional(),
  content: z.string().max(10000).optional(),
  mediaUrls: z.array(z.string().url()).optional(),
  sharedItemType: z.string().optional(),
  sharedItemId: z.string().uuid().optional(),
  visibility: z.enum(['public', 'followers', 'private']).optional(),
  tags: z.array(z.string()).optional(),
  mentionedUsers: z.array(z.string().uuid()).optional(),
});

const createCommentSchema = z.object({
  postId: z.string().uuid(),
  content: z.string().min(1).max(5000),
  parentId: z.string().uuid().optional(),
});

const createGroupSchema = z.object({
  name: z.string().min(3).max(100),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().max(5000).optional(),
  coverImageUrl: z.string().url().optional(),
  avatarUrl: z.string().url().optional(),
  isPrivate: z.boolean().optional(),
  requiresApproval: z.boolean().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  rules: z.string().max(10000).optional(),
});

// Feed routes
/**
 * @route GET /api/social/feed
 * @desc Get personalized feed
 */
router.get('/feed', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { page, limit, filter } = req.query;
    const feed = await socialService.getFeed(req.user!.id, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
      filter: filter as string,
    });
    res.json(feed);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/social/explore
 * @desc Get explore/discover feed
 */
router.get('/explore', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const { page, limit, category } = req.query;
    const explore = await socialService.getExploreFeed({
      userId: req.user?.id,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
      category: category as string,
    });
    res.json(explore);
  } catch (error) {
    next(error);
  }
});

// Post routes
/**
 * @route GET /api/social/posts/:id
 * @desc Get post by ID
 */
router.get('/posts/:id', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const post = await socialService.getPostById(req.params.id, req.user?.id);
    res.json(post);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/social/posts
 * @desc Create post
 */
router.post('/posts', authMiddleware, validate(createPostSchema), async (req: AuthRequest, res, next) => {
  try {
    const post = await socialService.createPost(req.user!.id, req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /api/social/posts/:id
 * @desc Update post
 */
router.patch('/posts/:id', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const post = await socialService.updatePost(req.params.id, req.user!.id, req.body);
    res.json(post);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/social/posts/:id
 * @desc Delete post
 */
router.delete('/posts/:id', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await socialService.deletePost(req.params.id, req.user!.id);
    res.json({ message: 'Пост удален' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/social/posts/:id/like
 * @desc Like post
 */
router.post('/posts/:id/like', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await socialService.likePost(req.params.id, req.user!.id);
    res.json({ message: 'Лайк добавлен' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/social/posts/:id/like
 * @desc Unlike post
 */
router.delete('/posts/:id/like', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await socialService.unlikePost(req.params.id, req.user!.id);
    res.json({ message: 'Лайк удален' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/social/posts/:id/comments
 * @desc Get post comments
 */
router.get('/posts/:id/comments', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const { page, limit } = req.query;
    const comments = await socialService.getPostComments(req.params.id, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

// Comment routes
/**
 * @route POST /api/social/comments
 * @desc Create comment
 */
router.post('/comments', authMiddleware, validate(createCommentSchema), async (req: AuthRequest, res, next) => {
  try {
    const comment = await socialService.createComment(req.user!.id, req.body);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/social/comments/:id
 * @desc Delete comment
 */
router.delete('/comments/:id', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await socialService.deleteComment(req.params.id, req.user!.id);
    res.json({ message: 'Комментарий удален' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/social/comments/:id/like
 * @desc Like comment
 */
router.post('/comments/:id/like', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await socialService.likeComment(req.params.id, req.user!.id);
    res.json({ message: 'Лайк добавлен' });
  } catch (error) {
    next(error);
  }
});

// Follow routes
/**
 * @route POST /api/social/follow/:userId
 * @desc Follow user
 */
router.post('/follow/:userId', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await socialService.followUser(req.user!.id, req.params.userId);
    res.json({ message: 'Подписка оформлена' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/social/follow/:userId
 * @desc Unfollow user
 */
router.delete('/follow/:userId', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await socialService.unfollowUser(req.user!.id, req.params.userId);
    res.json({ message: 'Подписка отменена' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/social/followers
 * @desc Get user's followers
 */
router.get('/followers', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { page, limit } = req.query;
    const followers = await socialService.getFollowers(req.user!.id, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 50,
    });
    res.json(followers);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/social/following
 * @desc Get user's following
 */
router.get('/following', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { page, limit } = req.query;
    const following = await socialService.getFollowing(req.user!.id, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 50,
    });
    res.json(following);
  } catch (error) {
    next(error);
  }
});

// Group routes
/**
 * @route GET /api/social/groups
 * @desc Get all groups
 */
router.get('/groups', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const { category, search, page, limit } = req.query;
    const groups = await socialService.getGroups({
      category: category as string,
      search: search as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
      userId: req.user?.id,
    });
    res.json(groups);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/social/groups/:id
 * @desc Get group by ID
 */
router.get('/groups/:id', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const group = await socialService.getGroupById(req.params.id, req.user?.id);
    res.json(group);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/social/groups
 * @desc Create group
 */
router.post('/groups', authMiddleware, validate(createGroupSchema), async (req: AuthRequest, res, next) => {
  try {
    const group = await socialService.createGroup(req.user!.id, req.body);
    res.status(201).json(group);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/social/groups/:id/join
 * @desc Join group
 */
router.post('/groups/:id/join', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await socialService.joinGroup(req.params.id, req.user!.id);
    res.json({ message: 'Вы присоединились к группе' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/social/groups/:id/leave
 * @desc Leave group
 */
router.post('/groups/:id/leave', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await socialService.leaveGroup(req.params.id, req.user!.id);
    res.json({ message: 'Вы покинули группу' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/social/my-groups
 * @desc Get user's groups
 */
router.get('/my-groups', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const groups = await socialService.getUserGroups(req.user!.id);
    res.json(groups);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/social/search
 * @desc Search users
 */
router.get('/search', async (req, res, next) => {
  try {
    const { q, type, page, limit } = req.query;
    const results = await socialService.search({
      query: q as string,
      type: type as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(results);
  } catch (error) {
    next(error);
  }
});

export default router;


