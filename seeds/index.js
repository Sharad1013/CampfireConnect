const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://0.0.0.0:27017/YelpCamp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '658c609fdfa64df4424c273b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "point",
                coodinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dc87fqdph/image/upload/v1703918177/YelpCamp/gajr1wffmxpexmfimmur.jpg',
                    filename: 'YelpCamp/gajr1wffmxpexmfimmur'
                },
                {
                    url: 'https://res.cloudinary.com/dc87fqdph/image/upload/v1703918176/YelpCamp/fo4lp3t9mbjvxyhdwbls.jpg',
                    filename: 'YelpCamp/fo4lp3t9mbjvxyhdwbls',
                }
            ],

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})