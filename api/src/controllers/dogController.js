const axios = require('axios');
const { Op } = require('sequelize');
const { Dog, Temperament } = require('../db.js');

function mapDog(dog) {
  return {
    id: dog.id,
    img: dog.reference_image_id,
    name: dog.name,
    height: dog.height?.imperial,
    weight: dog.weight?.imperial,
    life_span: dog.life_span,
    temperament:
      typeof dog.temperament === 'string'
        ? dog.temperament.replace(/\s/g, '').split(',')
        : dog.temperament,
  };
}

const getAllDogs = async (req, res, next) => {
  try {
    const dogsFromDB = await Dog.findAll({ include: Temperament });
    const formattedDogsDB = dogsFromDB.map((dog) => {
      const temperament = dog.Temperaments.map((temp) => temp.name);
      return {
        id: dog.id,
        img: dog.image,
        name: dog.name,
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
        temperament,
      };
    });

    const response = await axios.get('https://api.thedogapi.com/v1/breeds');
    const dogsFromAPI = response.data;
    const formattedDogsAPI = dogsFromAPI.map(mapDog);

    const allDogs = [...formattedDogsDB, ...formattedDogsAPI];

    res.json(allDogs);
  } catch (error) {
    next(error);
  }
};

const searchDogsByName = async (req, res, next) => {
  const { name } = req.query;

  try {
    const dogsFromDB = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: Temperament,
    });

    const formattedDogsDB = dogsFromDB.map((dog) => ({
      id: dog.id,
      img: dog.image,
      name: dog.name,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      temperament: dog.Temperaments.map((temp) => temp.name),
    }));

    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${name}`
    );
    const dogsFromAPI = response.data;
    const formattedDogsAPI = dogsFromAPI.map(mapDog);

    const allDogs = [...formattedDogsDB, ...formattedDogsAPI];

    if (allDogs.length === 0) {
      return res.status(404).json({ message: 'No dog breeds found.' });
    }

    res.json(allDogs);
  } catch (error) {
    next(error);
  }
};

const getDogById = async (req, res, next) => {
  const { idBreed } = req.params;

  try {
    if (!idBreed) {
      return res.status(400).json({ message: 'Invalid breed ID' });
    }

    let dog;

    if (!isNaN(idBreed)) {
      const response = await axios.get(
        `https://api.thedogapi.com/v1/breeds/${idBreed}`
      );

      if (Object.keys(response.data).length === 0) {
        return res.status(404).json({ message: 'Breed not found' });
      }

      dog = {
        id: response.data.id,
        img: response.data.reference_image_id,
        name: response.data.name,
        height: response.data.height?.imperial,
        weight: response.data.weight?.imperial,
        life_span: response.data.life_span,
        temperament:
          typeof response.data.temperament === 'string'
            ? response.data.temperament.replace(/\s/g, '').split(',')
            : response.data.temperament,
      };
    } else {
      const dogFromDB = await Dog.findOne({
        where: {
          id: idBreed,
        },
        include: Temperament,
      });

      if (!dogFromDB) {
        return res.status(404).json({ message: 'Breed not found' });
      }

      dog = {
        id: dogFromDB.id,
        name: dogFromDB.name,
        height: dogFromDB.height,
        weight: dogFromDB.weight,
        life_span: dogFromDB.life_span,
        image: dogFromDB.image,
        temperament: dogFromDB.Temperaments.map((temp) => temp.name),
      };
    }

    res.json(dog);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const createDog = async (req, res, next) => {
  const { name, height, weight, life_span, temperament, image } = req.body;

  try {
    const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image,
    });

    if (temperament && temperament.length > 0) {
      const selectedTemperaments = await Temperament.findAll({
        where: {
          name: temperament,
        },
      });

      await newDog.addTemperaments(selectedTemperaments);
    }

    res.json(newDog);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDogs,
  searchDogsByName,
  getDogById,
  createDog,
};
