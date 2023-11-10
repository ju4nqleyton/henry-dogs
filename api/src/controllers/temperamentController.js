const axios = require('axios');
const { Temperament } = require('../db.js');

(async function loadTemperaments() {
  try {
    const existingTemperaments = await Temperament.findAll();

    if (existingTemperaments.length === 0) {
      const response = await axios.get('https://api.thedogapi.com/v1/breeds');
      const breeds = response.data;

      const uniqueTemperaments = new Set();
      breeds.forEach((breed) => {
        breed.temperament &&
          breed.temperament
            .split(',')
            .forEach((temp) => uniqueTemperaments.add(temp.trim()));
      });

      const temperamentsToSave = Array.from(uniqueTemperaments).map((temp) => ({
        name: temp,
      }));
      await Temperament.bulkCreate(temperamentsToSave);
    }
  } catch (error) {
    console.error('Error loading temperaments:', error);
  }
})();

const getAllTemperaments = async (req, res, next) => {
  try {
    const existingTemperaments = await Temperament.findAll({
      attributes: ['id', 'name'],
    });

    if (existingTemperaments.length > 0) {
      return res.json(existingTemperaments);
    }

    return res.status(404).json({ error: 'No temperaments found.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTemperaments,
};
