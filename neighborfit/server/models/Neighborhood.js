import mongoose from 'mongoose';

const neighborhoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  safetyScore: { type: Number, required: true },
  affordabilityScore: { type: Number, required: true },
  amenitiesScore: { type: Number, required: true },
});

const Neighborhood = mongoose.model('Neighborhood', neighborhoodSchema);

export default Neighborhood;
