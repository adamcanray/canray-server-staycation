const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const fs = require('fs'); // fs stands file system

chai.use(chaiHttp); // use http for able request

// the test units
describe('API ENDPOINT TESTING', ()=>{
  // each test
  it('GET Landing Page', (done)=>{
    chai.request(app).get('/api/v1/member/landing-page').end((err, res)=>{
      expect(err).to.be.null; // expext null when error
      expect(res).to.have.status(200); // expext have status 200 when success
      expect(res.body).to.be.an('object'); // expect the body(data) is Object
      expect(res.body).to.have.property('hero'); // expect the body(data) have property `hero`
      expect(res.body.hero).to.have.all.keys('travelers', 'treasures', 'cities'); // expect the body(data) have specifics keys inside property `hero`
      expect(res.body).to.have.property('mostPicked'); // expect the body(data) have property `mostPicked`
      expect(res.body.mostPicked).to.have.an('array');
      expect(res.body).to.have.property('category'); // expect the body(data) have property `category`
      expect(res.body.category).to.have.an('array');
      expect(res.body).to.have.property('testimonial'); 
      expect(res.body.testimonial).to.have.an('object');
      done(); // for done the working
    })
  })

  it('GET Detail Page', (done)=>{
    chai.request(app).get('/api/v1/member/detail-page/5e96cbe292b97300fc902223').end((err, res)=>{
      expect(err).to.be.null; // expext null when error
      expect(res).to.have.status(200); // expext have status 200 when success
      expect(res.body).to.be.an('object'); // expect the body(data) is Object
      expect(res.body).to.have.property('country'); // expect the body(data) have property `country`
      expect(res.body).to.have.property('isPopular'); // expect the body(data) have property `isPopular`
      expect(res.body).to.have.property('unit'); // expect the body(data) have property `unit`
      expect(res.body).to.have.property('sumBooking'); // expect the body(data) have property `sumBooking`
      expect(res.body).to.have.property('imageId'); // expect the body(data) have property `imageId`
      expect(res.body.imageId).to.have.an('array');
      expect(res.body).to.have.property('featureId');
      expect(res.body.featureId).to.have.an('array');
      expect(res.body).to.have.property('activityId');
      expect(res.body.activityId).to.have.an('array');
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('title');
      expect(res.body).to.have.property('price');
      expect(res.body).to.have.property('city');
      expect(res.body).to.have.property('description');
      expect(res.body).to.have.property('__v');
      expect(res.body).to.have.property('bank');
      expect(res.body.bank).to.have.an('array');
      expect(res.body).to.have.property('testimonial'); 
      expect(res.body.testimonial).to.have.an('object');
      done(); // for done the working
    })
  })

  it('POST Booking Page', (done)=>{
    const image = __dirname + '/img/buktibayar.jpeg';
    const dataSample = {
      image,
      idItem: '5e96cbe292b97300fc902223',
      duration: 2,
      bookingStartDate: '9-4-2020',
      bookingEndDate: '11-4-2020',
      firstName: 'Itce',
      lastName: 'diasari',
      email: 'itce@gmail.com',
      phoneNumber: '08150008989',
      accountHolder: 'itce',
      bankFrom: 'BNI',
    };
    chai.request(app).post('/api/v1/member/booking-page')
    .set('Content-Type', 'application/x-www-form-urldecoded') // set Content Type
    .field('idItem', dataSample.idItem) // add each field to post
    .field('duration', dataSample.duration) // add each field to post
    .field('bookingStartDate', dataSample.bookingStartDate) // add each field to post
    .field('bookingEndDate', dataSample.bookingEndDate) // add each field to post
    .field('firstName', dataSample.firstName) // add each field to post
    .field('lastName', dataSample.lastName) // add each field to post
    .field('email', dataSample.email) // add each field to post
    .field('phoneNumber', dataSample.phoneNumber) // add each field to post
    .field('accountHolder', dataSample.accountHolder) // add each field to post
    .field('bankFrom', dataSample.bankFrom) // add each field to post
    .attach('image', fs.readFileSync(dataSample.image), 'buktibayar.jpeg') // use attach(field, file: MultipartValuSingle, options/filename: String) for multipart-form-data(file)
    .end((err, res)=>{
      expect(err).to.be.null; // expext null when error
      expect(res).to.have.status(201); // expext have status 201 when success post
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Success Booking');
      expect(res.body).to.have.property('booking');
      expect(res.body.booking).to.have.all.keys('payments','_id','invoice','bookingStartDate','bookingEndDate','total','itemId','memberId','__v');
      expect(res.body.booking.payments).to.have.all.keys('status','proofPayment','bankFrom','accountHolder');
      expect(res.body.booking.itemId).to.have.all.keys('_id','title','price','duration');
      console.log(res.body.booking)
      done(); // for done the working
    })
  })

})