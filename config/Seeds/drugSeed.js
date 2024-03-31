import mongoose from "mongoose";
import Drug from '../../model/drug.js'

const drugSeed = [
    {
        drugName: 'Acetazolamide Injection, 500 mg ',
        description: 'Treat certain convulsive disorders',
        unitPricing: 'Ampoule',
        code: 'ACETAZIN1',
        price: 41.25

    },
    {
        drugName: 'Acetazolamide Tablet, 250 mg',
        description: 'responsible for blocking fluid formation',
        unitPricing: 'Tablet',
        code: 'ACETAZTA1',
        price: 0.25

    },
    {
        drugName: 'Acetylcysteine Injection, 200 mg/mL' ,
        description: ' used for the treatment of paracetamol overdose',
        unitPricing: '1 mL',
        code: 'ACETAZIN1',
        price: 78

    }
];



//seeding data fxn
async function seedData() {
  try {
    await Drug.deleteMany(); //deleting existing data if any

    await Drug.insertMany(drugSeed); //inserting the seed data

    //closing the connection after seeding 
    mongoose.connection.close();

  } catch (error) {
    console.error('Error seeding drugs', error)
  }
}

seedData();