/* 
* Controller For API's 
*/

const Item = require('../models/Item');
const Treasure = require('../models/Activity');
const Traveler = require('../models/Booking');
const Category = require('../models/Category');
const Bank = require('../models/Bank');
const Member = require('../models/Member');
const Booking = require('../models/Booking');

module.exports = {
  landingPage: async (req, res) => {
    try {
      const mostPicked = await Item.find()
      .select('_id title country city price unit imageId') // pick selected field
      .limit(5) // limit the length of data
      .populate({ path: 'imageId', select: '_id imageUrl' }) // populate with selected field
      const category = await Category.find()
      .select('_id name') // pick selected field
      .limit(3) // limit the length of data
      .populate({
        path: 'itemId', 
        select: '_id title country city isPopular imageId' ,
        perDocumentLimit: 4, // limit the populate data
        option: { sort: { sumBooking: -1 } }, // sort by specifics field, -1 is DESCENDING(10 to 1)
        populate: { 
          path: 'imageId', 
          select: '_id imageUrl',
          perDocumentLimit: 1, // limit the populate data
        }, // multiple level populate with selected field
      }) // populate with selected field
      const traveler = await Traveler.find();
      const treasure = await Treasure.find();
      const city = await Item.find();

      // logic for specify isPopular
      for(let i = 0; i < category.length; i++) {
        for(let x = 0; x < category[i].itemId.length; x++) {
          const item = await Item.findOne({ _id: category[i].itemId[x]._id });
          item.isPopular = false; // isPopular default to false
          await item.save();
          if(category[i].itemId[0] === category[i].itemId[x]){
            item.isPopular = true; // change isPopular to true
            await item.save();  
          }
        }
      }

      const testimonial = {
        _id: "asd1293uasdads1",
        imageUrl: "images/testimonial2.jpg",
        name: "Happy Family",
        rate: 4.55,
        content: "What a great trip with my family and I should try again next time soon ...",
        familyName: "Angga",
        familyOccupation: "Product Designer"
      }

      res.status(200).json({ 
        hero: {
          travelers: traveler.length,
          treasures: treasure.length,
          cities: city.length,
        },
        mostPicked,
        category,
        testimonial
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  },
  
  detailPage: async (req, res) => {
    try {
      const {id} = req.params;
      const item = await Item.findOne({ _id: id })
      .populate({ path: 'featureId', select: '_id name qty imageUrl' }) // populate with selected field
      .populate({ path: 'activityId', select: '_id name type imageUrl' }) // populate with selected field
      .populate({ path: 'imageId', select: '_id imageUrl' }); // populate with selected field
      const bank = await Bank.find();

      const testimonial = {
        _id: "asd1293uasdads1",
        imageUrl: "images/testimonial1.jpg",
        name: "Happy Family",
        rate: 4.55,
        content: "What a great trip with my family and I should try again next time soon ...",
        familyName: "Angga",
        familyOccupation: "Product Designer"
      }

      res.status(200).json({
        ...item._doc, // send deeper the doc(data)
        bank,
        testimonial
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  },

  bookingPage: async (req, res) => {
    const {
      idItem,
      duration,
      // price,
      bookingStartDate,
      bookingEndDate,
      firstName,
      lastName,
      email,
      phoneNumber,
      accountHolder,
      bankFrom,
    } = req.body;
    // validation
    if(!req.file){
      return res.status(404).json({ message: 'Image not found' });
    }
    if(
      idItem === undefined ||
      duration === undefined ||
      // price === undefined ||
      bookingStartDate === undefined ||
      bookingEndDate === undefined ||
      firstName === undefined ||
      lastName === undefined ||
      email === undefined ||
      phoneNumber === undefined ||
      accountHolder === undefined ||
      bankFrom === undefined
    ){
      res.status(404).json({message: 'Lengkapi semua field'});
    }
    const item = await Item.findOne({ _id: idItem });
    if(!item){
      res.status(404).json({message: 'Item not found'});
    }
    
    item.sumBooking + 1; // setiap kali ada yang booking maka tambahkan sumBooking

    await item.save();

    let total = item.price * duration;
    let tax = total * 0.10; // pajak 10%
    const invoice = Math.floor(1000000 + Math.random()* 9000000)
    // console.log(total);
    // console.log(tax);
    // console.log(invoice);

    const member = await Member.create({
      firstName,
      lastName,
      email,
      phoneNumber
    }); // create data member

    const newBooking = {
      invoice,
      bookingStartDate,
      bookingEndDate,
      total: total += tax,
      itemId: {
        _id: item.id,
        title: item.title,
        price: item.price,
        duration: duration
      },
      memberId: member.id,
      payments: {
        proofPayment: `images/${req.file.filename}`,
        bankFrom: bankFrom,
        accountHolder: accountHolder
      }
    }

    const booking = await Booking.create(newBooking)

    res.status(201).json({message: 'Success Booking', booking});
  }
};