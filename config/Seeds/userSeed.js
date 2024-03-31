import mongoose from "mongoose";
import User from '../../model/user.js'

const userSeed = [
    {
        name: 'Admin',
        email: 'admin@medtrack.org',
        password: 'admin2024!'
    }
];

async function seedData() {
    try {
        await User.deleteMany();

        await User.create(userSeed);

        console.log('User seeded successfully')
        mongoose.connection.close();
        
    } catch (error) {
        console.error('Error seeding data', error)
        
    }
}

seedData();