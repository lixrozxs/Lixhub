const express = require('express');
const router = express.Router();

// Mock anime data - in production, this would come from an API
const mockAnime = [
  {
    id: '1',
    title: 'Attack on Titan',
    description: 'Humanity fights for survival against giant humanoid Titans.',
    episodes: 87,
    status: 'Completed',
    rating: 9.0,
    image: '/placeholder-anime-1.jpg'
  },
  {
    id: '2',
    title: 'Demon Slayer',
    description: 'A young boy becomes a demon slayer to save his sister.',
    episodes: 26,
    status: 'Completed',
    rating: 8.7,
    image: '/placeholder-anime-2.jpg'
  }
];

// Get all anime
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, search, genre } = req.query;
    
    // In production, fetch from database or external API
    res.json({
      anime: mockAnime,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: mockAnime.length,
        pages: Math.ceil(mockAnime.length / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch anime' });
  }
});

// Get anime by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const anime = mockAnime.find(a => a.id === id);
    
    if (!anime) {
      return res.status(404).json({ error: 'Anime not found' });
    }
    
    res.json(anime);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch anime' });
  }
});

module.exports = router;