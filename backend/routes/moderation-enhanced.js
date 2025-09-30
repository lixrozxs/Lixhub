const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const { canModerate } = require('../utils/permissions');

const prisma = new PrismaClient();

// Get moderation dashboard statistics
router.get('/dashboard', auth, canModerate, async (req, res) => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalPosts,
      totalComments,
      pendingReports,
      activeWarnings,
      recentActivity
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.post.count({ where: { status: 'PUBLISHED' } }),
      prisma.comment.count({ where: { isDeleted: false } }),
      prisma.report.count({ where: { status: 'PENDING' } }),
      prisma.userWarning.count({ where: { isActive: true } }),
      prisma.moderationLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          moderator: { select: { username: true, role: true } }
        }
      })
    ]);

    res.json({
      users: { total: totalUsers, active: activeUsers },
      content: { posts: totalPosts, comments: totalComments },
      moderation: {
        pendingReports,
        activeWarnings,
        recentActivity
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Get all reports with filtering
router.get('/reports', auth, canModerate, async (req, res) => {
  try {
    const { status, targetType, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (targetType) where.targetType = targetType;

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          reporter: { select: { username: true, avatar: true } }
        }
      }),
      prisma.report.count({ where })
    ]);

    res.json({
      reports,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Reports error:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// Update report status
router.patch('/reports/:id', auth, canModerate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, action, reason } = req.body;

    const report = await prisma.report.findUnique({
      where: { id }
    });

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const [updatedReport] = await Promise.all([
      prisma.report.update({
        where: { id },
        data: { status, updatedAt: new Date() }
      }),
      
      // Log moderation action
      prisma.moderationLog.create({
        data: {
          moderatorId: req.user.id,
          targetType: report.targetType,
          targetId: report.targetId,
          action: action || 'REVIEW',
          reason: reason || `Report ${status}: ${report.reason}`
        }
      })
    ]);

    res.json(updatedReport);
  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({ error: 'Failed to update report' });
  }
});

// Get user warnings
router.get('/warnings', auth, canModerate, async (req, res) => {
  try {
    const { userId, active, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (userId) where.userId = userId;
    if (active !== undefined) where.isActive = active === 'true';

    const [warnings, total] = await Promise.all([
      prisma.userWarning.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { username: true, avatar: true } },
          moderator: { select: { username: true, role: true } }
        }
      }),
      prisma.userWarning.count({ where })
    ]);

    res.json({
      warnings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Warnings error:', error);
    res.status(500).json({ error: 'Failed to fetch warnings' });
  }
});

// Create user warning
router.post('/warnings', auth, canModerate, async (req, res) => {
  try {
    const { userId, reason, severity, expiresAt } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const warning = await prisma.userWarning.create({
      data: {
        userId,
        moderatorId: req.user.id,
        reason,
        severity: severity || 'LOW',
        expiresAt: expiresAt ? new Date(expiresAt) : null
      },
      include: {
        user: { select: { username: true, avatar: true } },
        moderator: { select: { username: true, role: true } }
      }
    });

    // Create notification for user
    await prisma.notification.create({
      data: {
        userId,
        title: 'Warning Received',
        message: `You have received a ${severity.toLowerCase()} warning: ${reason}`,
        type: 'MODERATION',
        data: JSON.stringify({ warningId: warning.id })
      }
    });

    // Log moderation action
    await prisma.moderationLog.create({
      data: {
        moderatorId: req.user.id,
        targetType: 'USER',
        targetId: userId,
        action: 'WARN',
        reason
      }
    });

    res.status(201).json(warning);
  } catch (error) {
    console.error('Create warning error:', error);
    res.status(500).json({ error: 'Failed to create warning' });
  }
});

// Get moderation log
router.get('/log', auth, canModerate, async (req, res) => {
  try {
    const { moderatorId, targetType, action, page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (moderatorId) where.moderatorId = moderatorId;
    if (targetType) where.targetType = targetType;
    if (action) where.action = action;

    const [logs, total] = await Promise.all([
      prisma.moderationLog.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          moderator: { select: { username: true, role: true } }
        }
      }),
      prisma.moderationLog.count({ where })
    ]);

    res.json({
      logs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Moderation log error:', error);
    res.status(500).json({ error: 'Failed to fetch moderation log' });
  }
});

// Bulk actions on reports
router.post('/reports/bulk', auth, canModerate, async (req, res) => {
  try {
    const { reportIds, action, reason } = req.body;

    if (!Array.isArray(reportIds) || reportIds.length === 0) {
      return res.status(400).json({ error: 'Invalid report IDs' });
    }

    const reports = await prisma.report.findMany({
      where: { id: { in: reportIds } }
    });

    if (reports.length === 0) {
      return res.status(404).json({ error: 'No reports found' });
    }

    // Update all reports
    const updatedReports = await prisma.report.updateMany({
      where: { id: { in: reportIds } },
      data: { 
        status: action === 'RESOLVE' ? 'RESOLVED' : 'DISMISSED',
        updatedAt: new Date()
      }
    });

    // Log bulk action
    await prisma.moderationLog.create({
      data: {
        moderatorId: req.user.id,
        targetType: 'BULK',
        targetId: reportIds.join(','),
        action: action,
        reason: reason || `Bulk ${action.toLowerCase()} on ${reportIds.length} reports`
      }
    });

    res.json({
      message: `Successfully ${action.toLowerCase()}d ${updatedReports.count} reports`,
      count: updatedReports.count
    });
  } catch (error) {
    console.error('Bulk action error:', error);
    res.status(500).json({ error: 'Failed to perform bulk action' });
  }
});

module.exports = router;