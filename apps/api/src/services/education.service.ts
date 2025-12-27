import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';

// @desc    Create education content
// @route   POST /api/education/content
// @access  Private/Admin, Trainer, etc.
export const createEducationContent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const authorId = req.user.id;
  const { title, content, category, tags, imageUrl, readTime, isPublished } = req.body;

  try {
    const educationContent = await prisma.educationContent.create({
      data: {
        authorId,
        title,
        content,
        category,
        tags: tags || [],
        imageUrl,
        readTime: readTime || 5,
        isPublished: isPublished || false,
      },
    });

    res.status(201).json(educationContent);
  } catch (error: any) {
    logger.error(`Error creating education content: ${error.message}`);
    next(error);
  }
};

// @desc    Get education content
// @route   GET /api/education/content
// @access  Public
export const getEducationContent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { category, search, page = 1, limit = 20 } = req.query;

  try {
    const where: any = { isPublished: true };
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: String(search), mode: 'insensitive' } },
        { content: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [content, total] = await Promise.all([
      prisma.educationContent.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              profile: {
                select: {
                  avatarUrl: true,
                },
              },
            },
          },
        },
      }),
      prisma.educationContent.count({ where }),
    ]);

    res.status(200).json({
      content,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    logger.error(`Error getting education content: ${error.message}`);
    next(error);
  }
};

// @desc    Get single education content
// @route   GET /api/education/content/:id
// @access  Public
export const getEducationContentById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const content = await prisma.educationContent.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    if (!content) {
      res.status(404);
      throw new Error('Education content not found');
    }

    res.status(200).json(content);
  } catch (error: any) {
    logger.error(`Error getting education content: ${error.message}`);
    next(error);
  }
};

// @desc    Create course
// @route   POST /api/education/courses
// @access  Private/Admin, Trainer, etc.
export const createCourse = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const authorId = req.user.id;
  const { title, description, category, difficulty, duration, priceTokens, priceFiat, lessons, imageUrl, isPublished } = req.body;

  try {
    const course = await prisma.course.create({
      data: {
        authorId,
        title,
        description,
        category,
        difficulty,
        duration,
        priceTokens,
        priceFiat,
        imageUrl,
        isPublished: isPublished || false,
        lessons: {
          create: lessons || [],
        },
      },
      include: {
        lessons: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(201).json(course);
  } catch (error: any) {
    logger.error(`Error creating course: ${error.message}`);
    next(error);
  }
};

// @desc    Get courses
// @route   GET /api/education/courses
// @access  Public
export const getCourses = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { category, search, page = 1, limit = 20 } = req.query;

  try {
    const where: any = { isPublished: true };
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              profile: {
                select: {
                  avatarUrl: true,
                },
              },
            },
          },
          _count: {
            select: {
              lessons: true,
              enrollments: true,
            },
          },
        },
      }),
      prisma.course.count({ where }),
    ]);

    res.status(200).json({
      courses,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    logger.error(`Error getting courses: ${error.message}`);
    next(error);
  }
};

// @desc    Get single course
// @route   GET /api/education/courses/:id
// @access  Public
export const getCourse = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
        },
        author: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                avatarUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    });

    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }

    res.status(200).json(course);
  } catch (error: any) {
    logger.error(`Error getting course: ${error.message}`);
    next(error);
  }
};

// @desc    Enroll in course
// @route   POST /api/education/courses/:id/enroll
// @access  Private
export const enrollInCourse = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const course = await prisma.course.findUnique({ where: { id } });

    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.courseEnrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: id,
        },
      },
    });

    if (existingEnrollment) {
      res.status(400);
      throw new Error('Already enrolled in this course');
    }

    // Create enrollment
    const enrollment = await prisma.courseEnrollment.create({
      data: {
        userId,
        courseId: id,
      },
      include: {
        course: true,
      },
    });

    res.status(201).json(enrollment);
  } catch (error: any) {
    logger.error(`Error enrolling in course: ${error.message}`);
    next(error);
  }
};

// @desc    Update education content
// @route   PUT /api/education/content/:id
// @access  Private/Admin, Trainer, etc.
export const updateEducationContent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const userRole = req.user.role;
  const { id } = req.params;
  const { title, content, category, tags, imageUrl, readTime, isPublished } = req.body;

  try {
    const existingContent = await prisma.educationContent.findUnique({ where: { id } });

    if (!existingContent) {
      res.status(404);
      throw new Error('Education content not found');
    }

    if (existingContent.authorId !== userId && userRole !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to update this content');
    }

    const updatedContent = await prisma.educationContent.update({
      where: { id },
      data: {
        title,
        content,
        category,
        tags,
        imageUrl,
        readTime,
        isPublished,
      },
    });

    res.status(200).json(updatedContent);
  } catch (error: any) {
    logger.error(`Error updating education content: ${error.message}`);
    next(error);
  }
};

// @desc    Delete education content
// @route   DELETE /api/education/content/:id
// @access  Private/Admin, Trainer, etc.
export const deleteEducationContent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const userRole = req.user.role;
  const { id } = req.params;

  try {
    const existingContent = await prisma.educationContent.findUnique({ where: { id } });

    if (!existingContent) {
      res.status(404);
      throw new Error('Education content not found');
    }

    if (existingContent.authorId !== userId && userRole !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to delete this content');
    }

    await prisma.educationContent.delete({ where: { id } });
    res.status(200).json({ message: 'Education content deleted successfully' });
  } catch (error: any) {
    logger.error(`Error deleting education content: ${error.message}`);
    next(error);
  }
};

