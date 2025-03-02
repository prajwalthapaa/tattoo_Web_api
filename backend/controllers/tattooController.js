import { imageUpload } from "../middlewares/imageUpload.js";
import { TattooModel } from "../models/Tattoo.js";

export const createTattoo = async (req, res, next) => {
  try {
    const upload = imageUpload.single("tattooImage"); // Allow only one image
    upload(req, res, async function (err) {
      const {
        name,
        type,
        city,
        address,
        description,
        rating,
        rooms,
        cheapestPrice,
      } = req.body;

      // Validate required fields
      if (
        !name ||
        !type ||
        !city ||
        !address ||
        !description ||
        !rating ||
        !cheapestPrice
      ) {
        return res.status(400).json({ message: "All fields are required!" });
      }

      // Assuming req.user is set by authentication middleware
      const user = req.user._id;

      if (err) {
        const error = new Error(
          "An unknown error occurred while uploading the image! " + err.message
        );
        return next(error);
      } else {
        if (!req.file) {
          const error = new Error("You must upload a tattoo image!");
          return next(error);
        }

        // Use the uploaded filename as a string
        const photo = req.file.filename;

        // Create new tattoo document
        const newTattoo = new TattooModel({
          name,
          type,
          city,
          address,
          description,
          rating,
          rooms,
          cheapestPrice,
          photos: photo, 
          user,
        });

        const savedTattoo = await newTattoo.save();
        return res
          .status(201)
          .json({ message: "Tattoo place created!", data: savedTattoo });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateTattoo = async (req, res, next) => {
  try {
    const {
      name,
      type,
      city,
      address,
      description,
      rating,
      rooms,
      cheapestPrice,
    } = req.body;
    if (
      !name ||
      !type ||
      !city ||
      !address ||
      !description ||
      !rating ||
      !rooms ||
      !cheapestPrice
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedTattoo = await TattooModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTattoo);
  } catch (error) {
    next(error);
  }
};

export const deleteTattoo = async (req, res, next) => {
  try {
    await TattooModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Tattoo has been deleted." });
  } catch (error) {
    next(error);
  }
};

export const getTattoo = async (req, res, next) => {
  try {
    const tattoo = await TattooModel.findById(req.params.id);
    res.status(200).json(tattoo);
  } catch (error) {
    next(error);
  }
};

// Get all tattoos with filters
export const getTattoos = async (req, res, next) => {
  try {
    const { min, max, ...others } = req.query;
    const tattoos = await TattooModel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999999 },
    }).limit(req.query.limit);
    res.status(200).json(tattoos);
  } catch (error) {
    next(error);
  }
};
