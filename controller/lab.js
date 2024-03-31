import { isValidObjectId } from "mongoose";
import Lab from "../model/lab.js";

//get req route: /api/lab
export const getLabs = async (req, res) => {
  try {
    const labs = await Lab.find();
    res.status(200).json({labs})
  } catch (error) {
    console.error("Error fetching LabItems:", error);
    res.status(500).json({ message: "Internal Server Error, Try again later" });
  }
};




//post req route: /api/lab
export const createLabs = async (req, res) => {
  try {
    const { labItem, labType, category, subCategory, code, price } = req.body;

    if (!labItem || !labType || !category || !subCategory || !code || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingLabItem = await Lab.findOne({ code });
    if (existingLabItem) {
      return res.status(400).json({ message: 'Lab Item already exists' });
    }

    const newLabItem = new Lab({
      labItem,
      labType,
      category,
      subCategory,
      code,
      price,
    });

    // saving to db
    await newLabItem.save();
    return res.status(200).json({ message: 'Lab Item successfully created' });

  } catch (error) {
    console.error("Error creating LabItems:", error);
    return res.status(500).json({ message: "Internal Server Error, Try again later" });
  }
};



//patch req route: /api/lab/:id
export const updateLab = async (req, res) => {
  try {
    const labId = req.params.id;

    if(isValidObjectId(labId)){
        res.status(400).json({message: 'Invalid Item ID'})
    }

    const { labItem, labType, category, subCategory, code, price } = req.body;

    const lab = await Lab.findOne(labId)

    if(!lab){
        res.status(404).json({message: 'Lab Item not found'})
    }

    //updating fields
    
    if(labItem) drug.labItem = labItem;
    if(labType) drug.labType = labType;
    if(category) drug.category = category;
    if(subCategory) drug.subCategory = subCategory;
    if(code) drug.code = code;
    if(price) drug.price = price;

    res.status(200).json({message: `Lab Item ${labId} successfully deleted`})


  } catch (error) {
    console.error("Error updating LabItems:", error);
    res.status(500).json({ message: "Internal Server Error, Try again later" });
  }
};


//delete req route: /api/lab/:id
export const deleteLab = async (req, res) => {
  try {
    const labId = req.params.id;

    if (!isValidObjectId(labId)) {
      return res.status(400).json({ message: 'Invalid Item ID' });
    }

    // Deleting Lab Item
    const lab = await Lab.deleteOne({ _id: labId });

    if (lab.deletedCount === 0) {
      return res.status(404).json({ message: 'Lab Item not found' });
    }

    return res.status(200).json({ message: `Lab Item ${labId} is successfully deleted` });
  } catch (error) {
    console.error("Error deleting LabItems:", error);
    return res.status(500).json({ message: "Internal Server Error, Try again later" });
  }
};


//get req route: /api/drug/:id

export const getLabById = async (req, res) => {
  try {
      const labId = req.params.id;

      const lab = await Lab.findById(labId);
      
      if (!lab) {
          return res.status(404).json({ message: 'Lab Item not found' });
      }

     return res.status(200).json({ lab });
      
  } catch (error) {
      console.error('Error fetching drug:', error);
      res.status(500).json({ message: 'Internal Server Error, Try again later' });
  }
};


// GET route: /api/lab/search
export const searchLabs = async (req, res) => {
  try {
    const { search } = req.query; // Extract search term from query parameters

    // Perform a case-insensitive search on labItem field
    const labs = await Lab.find({
      labItem: { $regex: new RegExp(search, 'i') }
    }).select('labItem'); // Only select labItem field

    return res.status(200).json({ labs });
  } catch (error) {
    console.error('Error searching labs:', error);
    return res.status(500).json({ message: 'Internal Server Error, Try again later' });
  }
};





// Backend code for handling pagination
export const getPaginatedData = async (req, res) => {
  const { page = 1, size = 10 } = req.query;
  const pageNumber = parseInt(page);
  const pageSize = parseInt(size);
  const skip = (pageNumber - 1) * pageSize;

  try {
      const data = await Data.find()
          .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
          .skip(skip)
          .limit(pageSize);
      res.json(data);
  } catch (error) {
      console.error("Error fetching paginated data:", error);
      res.status(500).json({ message: "Internal Server Error, Try again later" });
  }
};
