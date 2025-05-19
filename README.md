# Blogify

**Blogify** is a full-stack blogging web application built using **Node.js**, **Express**, **MongoDB**, and **EJS**. The app allows users to sign up, log in, and create blog posts. It supports image uploads for both user profiles and blog content, with different storage mechanisms for each.

---

## 🔑 Key Features

- **User Signup & Signin**
  - Full validation using `express-validator`
  - Secure password hashing with `bcrypt`
  - Role selection during signup (admin/user) — stored in the database but not yet functional

- **User Profile Image Handling**
  - Profile pictures uploaded via **Multer (Memory Storage)**
  - Stored as **Binary Data in MongoDB**
  - Default profile image is shown if the user does not upload one

- **Blog Creation & Image Handling**
  - Users can post blogs with a title, content, and image
  - Blog images uploaded via **Multer (Disk Storage)** and stored in the `uploads/` folder

- **Image Rendering**
  - Profile images are served via a custom route from MongoDB
  - Blog images are accessed directly from the `uploads/` folder

- **Dynamic Navigation Bar**
  - Navbar displays login/signup for guests
  - Displays profile image and user options when logged in

- **Search Functionality**
  - Users can search blog posts by keywords

---

## 🛠️ Tech Stack

| Layer       | Technologies                                     |
|-------------|--------------------------------------------------|
| Backend     | Node.js, Express                                 |
| Frontend    | EJS, HTML, CSS, Bootstrap                        |
| Database    | MongoDB (with Mongoose ODM)                      |
| File Upload | Multer (Memory Storage for profile, Disk for blog) |
| Validation  | express-validator                                |
| Security    | bcrypt (password hashing)                        |
| Auth        | Session-based (JWT planned for future)           |
| Config      | dotenv for environment variables (`.env`)        |

---

## 📁 Project Structure

   
             Blogify/
             ├── controllers/
             │   ├── blogController.js
             │   └── userController.js
             ├── models/
             │   ├── Blog.js
             │   └── User.js
             ├── routes/
             │   ├── blog.js
             │   └── user.js
             ├── views/
             │   ├── partials/
             │   │   ├── head.ejs
             │   │   ├── nav.ejs
             │   │   └── script.ejs
             │   ├── home.ejs
             │   ├── signup.ejs
             │   ├── signin.ejs
             ├── public/
             │   └── images/
             │       └── defaultProfile.jpg
             ├── uploads/               # Stores blog images (disk storage)
             ├── .env                  # Environment variables
             ├── index.js              # Main entry point (root file)
             ├── package.json
             └── README.md



##  🔧    Installation & Setup

  1. **Clone the Repository**

   
          git clone https://github.com/sagargautam500/blogify.git
          cd blogify

2. Install Dependencies
   
       npm install
4. Create .env File
   
    Create a .env file in the root directory with the following content:
   
          DB_PATH=mongodb+srv://sagargautam389:sagargautam389@usercluster.tmvdaad.mongodb.net/blogify?retryWrites=true&w=majority&appName=userCluster
          JWT_SECRET=$sagarGtm$$$@389
          PORT=3000
    Make sure MongoDB is running locally on your system.

4. Run the Application
   
             npm start
      Then open http://localhost:3000 in your browser.

✅ Usage
🔐 Sign Up
Enter full name, email, password, confirm password, and role

Optionally upload a profile picture (stored in MongoDB)

🔓 Sign In
Login with email and password

token  is created and set cookie upon login

📝 Create Blog Post
Enter blog title, content, and upload an image (stored in uploads/ folder)

📄 View Blogs
Blogs display title, content, author info, and blog image

Profile image is served from MongoDB binary data

🖼️ Image Storage Summary
Type	Storage Method	Location
Profile Picture	Memory Storage	Stored in MongoDB (Binary)
Blog Image	Disk Storage	Stored in uploads/ folder

🔍 Form Validation Summary
Implemented via express-validator:

Full Name: Required, minimum 3 letters, only letters/spaces

Email: Valid format required

Password: Minimum 6 characters, includes lowercase, uppercase, number, special character

Confirm Password: Must match password

🔮 Future Enhancements
🔐 Implement role-based access control (admin/user)

🛡️ Add JWT-based token authentication

✏️ Add edit/delete blog functionality

⚙️ Improve error handling and flash messages

📱 Make UI fully responsive



👨‍💻 Author
Sagar Gautam
BSc.CSIT @ Bhaktapur Multiple Campus
Mern Stack Developer (React,Node js,Express,Mongodb(via mongoose))


