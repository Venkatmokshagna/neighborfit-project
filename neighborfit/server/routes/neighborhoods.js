import express from 'express';
import Neighborhood from '../models/Neighborhood.js';
import Joi from 'joi';  // Import Joi for validation

const router = express.Router();

// 🧠 Matching route with validation
router.post('/match', async (req, res) => {
  // Define validation schema for preferences
  const schema = Joi.object({
    preferences: Joi.object({
      safety: Joi.number().min(0).max(1).required(),
      affordability: Joi.number().min(0).max(1).required(),
      amenities: Joi.number().min(0).max(1).required(),
    }).required(),
  });

  // Validate the request body
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { preferences } = req.body;

  try {
    const neighborhoods = await Neighborhood.find();

    const scored = neighborhoods.map(n => {
      const score =
        preferences.safety * n.safetyScore +
        preferences.affordability * n.affordabilityScore +
        preferences.amenities * n.amenitiesScore;

      return { ...n._doc, matchScore: score };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    res.json(scored.slice(0, 5));  // Return the top 5 matches
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🌱 Seeding route with validation for seed data
router.get('/seed', async (req, res) => {
  // Example: Validate data for the seed route (this can be done in different ways)
  const schema = Joi.array().items(
    Joi.object({
      name: Joi.string().min(3).required(),
      safetyScore: Joi.number().min(1).max(10).required(),
      affordabilityScore: Joi.number().min(1).max(10).required(),
      amenitiesScore: Joi.number().min(1).max(10).required(),
    })
  );

  const neighborhoodsData = [
    { name: 'Devi sri prasad', safetyScore: 8, affordabilityScore: 6, amenitiesScore: 7 },
    { name: 'Thaman', safetyScore: 6, affordabilityScore: 5, amenitiesScore: 9 },
    { name: 'Anirudh', safetyScore: 7, affordabilityScore: 7, amenitiesScore: 6 },
    { name: 'A.R rahman', safetyScore: 5, affordabilityScore: 8, amenitiesScore: 6 },
    { name: 'Mickey', safetyScore: 9, affordabilityScore: 5, amenitiesScore: 5 }
  ];

  // Validate the seed data before inserting into the database
  const { error } = schema.validate(neighborhoodsData);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    await Neighborhood.deleteMany({});
    await Neighborhood.insertMany(neighborhoodsData);
    res.send('✅ Seeded neighborhoods!');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
