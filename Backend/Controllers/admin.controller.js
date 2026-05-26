// import Admin from '../models/Admin.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';

// // Generate JWT Token
// const generateToken = (id, role) => {
//     return jwt.sign(
//         { 
//             id, 
//             role,
//             timestamp: Date.now() 
//         }, 
//         process.env.JWT_SECRET, 
//         { 
//             expiresIn: process.env.JWT_EXPIRE || '30d' 
//         }
//     );
// };

// // @desc    Register admin (Single admin only)
// // @route   POST /api/admin/register
// // @access  Public (but only works if no admin exists)
// export const registerAdmin = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if all required fields are provided
//         if (!name || !email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide all required fields: name, email, password'
//             });
//         }

//         // Validate email format
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide a valid email address'
//             });
//         }

//         // Validate password strength
//         if (password.length < 6) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Password must be at least 6 characters long'
//             });
//         }

//         // Check if password contains at least one uppercase letter and one number
//         const hasUpperCase = /[A-Z]/.test(password);
//         const hasNumber = /[0-9]/.test(password);
        
//         if (!hasUpperCase || !hasNumber) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Password must contain at least one uppercase letter and one number'
//             });
//         }

//         // Check if admin already exists (SINGLE ADMIN CONSTRAINT)
//         const existingAdmin = await Admin.findOne();
        
//         if (existingAdmin) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Admin account already exists. Only one administrator account is allowed.',
//                 error: 'ADMIN_EXISTS'
//             });
//         }

//         // Check if email is already registered (additional check)
//         const emailExists = await Admin.findOne({ email: email.toLowerCase() });
//         if (emailExists) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Email already registered'
//             });
//         }

//         // Create new admin
//         const admin = await Admin.create({
//             name: name.trim(),
//             email: email.toLowerCase().trim(),
//             password, // Will be hashed by pre-save hook
//             role: 'admin',
//             isActive: true,
//             createdAt: new Date()
//         });

//         // Generate JWT token
//         const token = generateToken(admin._id, admin.role);

//         // Remove password from response
//         const adminResponse = {
//             id: admin._id,
//             name: admin.name,
//             email: admin.email,
//             role: admin.role,
//             isActive: admin.isActive,
//             createdAt: admin.createdAt
//         };

//         // Send success response
//         res.status(201).json({
//             success: true,
//             message: 'Admin account created successfully',
//             token,
//             admin: adminResponse
//         });

//     } catch (error) {
//         console.error('Admin Registration Error:', error);
        
//         // Handle duplicate key error
//         if (error.code === 11000) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Admin already exists with this email'
//             });
//         }
        
//         // Handle validation errors
//         if (error.name === 'ValidationError') {
//             const messages = Object.values(error.errors).map(err => err.message);
//             return res.status(400).json({
//                 success: false,
//                 message: 'Validation Error',
//                 errors: messages
//             });
//         }
        
//         res.status(500).json({
//             success: false,
//             message: 'Server error during registration. Please try again later.',
//             error: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// };

// // @desc    Login admin
// // @route   POST /api/admin/login
// // @access  Public
// export const loginAdmin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if email and password are provided
//         if (!email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide email and password'
//             });
//         }

//         // Find admin by email
//         const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
        
//         if (!admin) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Invalid email or password'
//             });
//         }

//         // Check if admin account is active
//         if (!admin.isActive) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Account is deactivated. Please contact super administrator.'
//             });
//         }

//         // Verify password
//         const isPasswordValid = await admin.comparePassword(password);
        
//         if (!isPasswordValid) {
//             // Log failed attempt (for security monitoring)
//             console.warn(`Failed login attempt for admin: ${email}`);
            
//             return res.status(401).json({
//                 success: false,
//                 message: 'Invalid email or password'
//             });
//         }

//         // Update last login timestamp
//         admin.lastLogin = new Date();
//         await admin.save({ validateBeforeSave: false });

//         // Generate JWT token
//         const token = generateToken(admin._id, admin.role);

//         // Remove sensitive data from response
//         const adminResponse = {
//             id: admin._id,
//             name: admin.name,
//             email: admin.email,
//             role: admin.role,
//             isActive: admin.isActive,
//             lastLogin: admin.lastLogin,
//             createdAt: admin.createdAt
//         };

//         // Send success response
//         res.status(200).json({
//             success: true,
//             message: 'Login successful',
//             token,
//             admin: adminResponse
//         });

//     } catch (error) {
//         console.error('Admin Login Error:', error);
        
//         res.status(500).json({
//             success: false,
//             message: 'Server error during login. Please try again later.',
//             error: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// };

// // @desc    Get current admin profile
// // @route   GET /api/admin/profile
// // @access  Private
// export const getAdminProfile = async (req, res) => {
//     try {
//         const admin = await Admin.findById(req.user.id).select('-password');
        
//         if (!admin) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Admin not found'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             admin
//         });

//     } catch (error) {
//         console.error('Get Admin Profile Error:', error);
        
//         res.status(500).json({
//             success: false,
//             message: 'Server error while fetching profile'
//         });
//     }
// };

// // @desc    Update admin profile
// // @route   PUT /api/admin/profile
// // @access  Private
// export const updateAdminProfile = async (req, res) => {
//     try {
//         const { name, email, currentPassword, newPassword } = req.body;
        
//         const admin = await Admin.findById(req.user.id);
        
//         if (!admin) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Admin not found'
//             });
//         }

//         // Update name if provided
//         if (name) {
//             admin.name = name.trim();
//         }

//         // Update email if provided
//         if (email && email !== admin.email) {
//             // Check if email is already taken
//             const emailExists = await Admin.findOne({ email: email.toLowerCase() });
//             if (emailExists && emailExists._id.toString() !== admin._id.toString()) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Email already in use'
//                 });
//             }
//             admin.email = email.toLowerCase().trim();
//         }

//         // Update password if provided
//         if (currentPassword && newPassword) {
//             // Verify current password
//             const isPasswordValid = await admin.comparePassword(currentPassword);
            
//             if (!isPasswordValid) {
//                 return res.status(401).json({
//                     success: false,
//                     message: 'Current password is incorrect'
//                 });
//             }

//             // Validate new password
//             if (newPassword.length < 6) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'New password must be at least 6 characters'
//                 });
//             }

//             admin.password = newPassword;
//         }

//         await admin.save();

//         // Return updated admin without password
//         const updatedAdmin = {
//             id: admin._id,
//             name: admin.name,
//             email: admin.email,
//             role: admin.role,
//             isActive: admin.isActive,
//             lastLogin: admin.lastLogin,
//             updatedAt: admin.updatedAt
//         };

//         res.status(200).json({
//             success: true,
//             message: 'Profile updated successfully',
//             admin: updatedAdmin
//         });

//     } catch (error) {
//         console.error('Update Admin Profile Error:', error);
        
//         res.status(500).json({
//             success: false,
//             message: 'Server error while updating profile'
//         });
//     }
// };

// // @desc    Logout admin
// // @route   POST /api/admin/logout
// // @access  Private
// export const logoutAdmin = async (req, res) => {
//     try {
//         // Since we're using JWT, logout is handled client-side
//         // But we can add token to blacklist if needed
//         res.status(200).json({
//             success: true,
//             message: 'Logged out successfully'
//         });
//     } catch (error) {
//         console.error('Logout Error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error during logout'
//         });
//     }
// };

// // @desc    Check if admin exists
// // @route   GET /api/admin/check
// // @access  Public
// export const checkAdminExists = async (req, res) => {
//     try {
//         const adminExists = await Admin.findOne();
        
//         res.status(200).json({
//             success: true,
//             exists: !!adminExists,
//             message: adminExists ? 'Admin account exists' : 'No admin account found'
//         });
//     } catch (error) {
//         console.error('Check Admin Error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error'
//         });
//     }
// };