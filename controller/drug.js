import { isValidObjectId } from "mongoose";
import Drug from "../model/drug.js";

//get req route: /api/drug
export const getDrugs = async (req, res) => {
    try {
        const drugs = await Drug.find();
      return  res.status(200).json({drugs})
    } catch (error) {
        console.error('Error fetching drugs:', error)
       return res.status(500).json({message: 'Internal Server Error, Try again later'})
    }
  
}



//post req route: /api/drug
export const uploadDrugs = async (req, res) => {
    try {
        const { drugName, description, unitPricing, code, price } = req.body;

        if(!drugName || !description || !unitPricing || !code || !price ) {
           return res.status(400).json({message: 'All fields are required'})
        }

        const existingDrug = await Drug.findOne({code})
        if(existingDrug){
          return  res.status(409).json({message: 'Drug already exixts'})
        }

        //adding new drug
        const newDrug = new Drug({
            drugName,
            description,
            unitPricing,
            code,
            price,
        })


        //saving in db
        await newDrug.save();
       return res.status(200).json({message: 'Drug successfully uploaded', newDrug})
        
    } catch (error) {
        console.error('Error uploading drugs:', error)
      return  res.status(500).json({message: 'Internal Server Error, Try again later'})
    }
    
}


//patch req route: /api/drug/:id
export const updateDrug = async (req, res) => {
    try {
        const drugId = req.params.id; 

        if(!isValidObjectId (drugId)){
           return res.status(400).json({message: 'Invalid drug ID'})
        }

        const { drugName, description, unitPricing, code, price } = req.body;

        const drug = await Drug.findById(drugId);

        if(!drug){
           return res.status(404).json({message: 'Drug not found'})
        }


        //updating drug field
        if(drugName) drug.drugName = drugName;
        if(description) drug.description = description;
        if(unitPricing) drug.unitPricing = unitPricing;
        if(code) drug.code = code;
        if(price) drug.price = price;

        await drug.save();
      return  res.status(200).json({message: `Drug ${drugId} successfully updated`})
        
    } catch (error) {
        console.error('Error updating drug:', error)
       return res.status(500).json({message: 'Internal Server Error, Try again later'}) 
    }
}


//delete req route: /api/drug/:id
export const deleteDrug = async (req, res) => {
   try {
    const drugId = req.params.id; 

    if(!isValidObjectId (drugId)){
        res.status(400).json({message: 'Invalid drug ID'})
    }

    //deleting drug 
    const drug = await Drug.findByIdAndDelete({_id: drugId});
    
    if(drug.deletedCount === 0) {
      return  res.status(404).json({message: 'Drug not found'})
    }
    
    res.status(200).json({message: `Drug ${drugId} successfully deleted`})
    
   } catch (error) {
    console.error('Error deleting drug:', error)
    res.status(500).json({message: 'Internal Server Error, Try again later'})
   }

}


//get req route: /api/drug/:id

export const getDrugById = async (req, res) => {
    try {
        const drugId = req.params.id;

        const drug = await Drug.findById(drugId);
        
        if (!drug) {
            return res.status(404).json({ message: 'Drug not found' });
        }

       return res.status(200).json({ drug });
        
    } catch (error) {
        console.error('Error fetching drug:', error);
        res.status(500).json({ message: 'Internal Server Error, Try again later' });
    }
};


//get req route: /api/drug
export const getUnitPricing = async (req, res) => {
    try {
        // Get distinct unit pricing values from the database
        const unitPricing = await Drug.distinct('unitPricing');

        // Prepare an object to store the quantity of each unit pricing
        const unitPricingQuantities = {};

        // Loop through each unit pricing and count the number of occurrences in the database
        for (const unit of unitPricing) {
            const count = await Drug.countDocuments({ unitPricing: unit });
            unitPricingQuantities[unit] = count;
        }

        // Send the unit pricing and their quantities
        res.json({ unitPricing, unitPricingQuantities });
        
    } catch (error) {
        console.error('Error fetching Unit of Pricing:', error);
        res.status(500).json({ message: 'Internal Server Error, Try again later' });
    }
}



export const searchDrugs = async (req, res) => {
    try {
        const { search } = req.query; // Extract search term from query parameters
        
        // Perform a case-insensitive search on drugName, description, and code fields
        const drugs = await Drug.find({
            $or: [
                { drugName: { $regex: new RegExp(search, 'i') } },
                { description: { $regex: new RegExp(search, 'i') } },
                { code: { $regex: new RegExp(search, 'i') } }
            ]
        }).select('drugName description code'); // Only select drugName, description, and code fields
        
        return res.status(200).json({ drugs });
    } catch (error) {
        console.error('Error searching drugs:', error);
        return res.status(500).json({ message: 'Internal Server Error, Try again later' });
    }
}




