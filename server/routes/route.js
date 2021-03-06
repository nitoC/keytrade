const express=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const signup=require('../controllers/auth/signup')
const deposit=require('../controllers/dashboard/deposit')
const pending=require('../controllers/admin/admin')
const signin=require('../controllers/auth/signin')
const resetPassword=require('../controllers/auth/resetPassword')
const forgotPassword=require('../controllers/auth/forgotPassword')
const dashboard=require('../controllers/dashboard/dashboard')
const router=express.Router()
router.post('/forgotPassword',forgotPassword)
router.patch('/reset',resetPassword)
router.patch('/deposit',deposit)
router.post('/register',signup)
router.post('/login',signin)
router.get('/dashboard',dashboard)
router.get('/pending',pending)
module.exports=router