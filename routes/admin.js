const router = require('express').Router()
const adminController = require('../controllers/adminController')
const { uploadSingle, uploadMultiple } = require('../middlewares/multer')
const auth = require('../middlewares/auth')
/* Create Endpoint for render controller that rendered view */
router.get('/signin', adminController.viewSignin)
router.post('/signin', adminController.actionSignin)
router.use(auth) // use auth before go to dashboard
router.get('/logout', adminController.actionLogout)
router.get('/dashboard', adminController.viewDashboard)
/* Endpoint Category */
router.get('/category', adminController.viewCategory)
router.post('/category', adminController.addCategory)
router.put('/category', adminController.editCategory)
router.delete('/category/:id', adminController.deleteCategory)
/* Endpoint Bank */
router.get('/bank', adminController.viewBank)
router.post('/bank', uploadSingle, adminController.addBank) /* check middleware before addBank controller */
router.put('/bank', uploadSingle, adminController.editBank) /* check middleware before addBank controller */
router.delete('/bank/:id', adminController.deleteBank)
/* Endpoint Item */
router.get('/item', adminController.viewItem)
router.post('/item', uploadMultiple, adminController.addItem)
router.get('/item/show-image/:id', adminController.showImageItem)
router.get('/item/:id', adminController.showEditItem)
router.put('/item/:id', uploadMultiple, adminController.editItem)
router.delete('/item/:id/delete', adminController.deleteItem)
/* Endpoint Detail Item */
router.get('/item/show-detail-item/:itemId', adminController.viewDetailItem)
router.post('/item/add/feature', uploadSingle, adminController.addFeature)
router.put('/item/update/feature', uploadSingle, adminController.editFeature)
router.delete('/item/:itemId/feature/:id', adminController.deleteFeature)

router.post('/item/add/activity', uploadSingle, adminController.addActivity)
router.put('/item/update/activity', uploadSingle, adminController.editActivity)
router.delete('/item/:itemId/activity/:id', adminController.deleteActivity)

router.get('/booking', adminController.viewBooking)
router.get('/booking/:id', adminController.showDetailBooking)
router.put('/booking/:id/confirmation', adminController.actionConfirmation)
router.put('/booking/:id/reject', adminController.actionReject)

/* End Create Endpoint for render controller that rendered view */
module.exports = router