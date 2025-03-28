# User Management App

A React-based user management application that allows users to view, edit, and delete users.  
Built using **React, Redux Toolkit, React Router, and TailwindCSS** with API integration from [Reqres](https://reqres.in/).  

---

## 🚀 Features

- View a paginated list of users  
- Edit user details (First Name, Last Name, Email)  
- Delete users  
- Responsive grid layout  
- Client-side routing with React Router  
- Hosted on **Vercel**  

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the repository**
```sh
git clone https://github.com/akash-kyadari/EmployeeWise-.git
cd EmployeeWise-
```

### **2️⃣ Install dependencies**
Ensure you have **Node.js** installed on your system. Then, run:
```sh
npm install
```

### **3️⃣ Run the development server**
Start the development server with:
```sh
npm run dev
```
This will start the app on `http://localhost:5173` by default.

### **4️⃣ Build for production**
To create a production build, run:
```sh
npm run build
```
The build output will be located in the `dist` directory.

### **5️⃣ Preview the production build**
To preview the production build locally, run:
```sh
npm run preview
```

---

## ⚙️ Assumptions & Considerations

1. **Authentication**: The app uses a mock API ([Reqres](https://reqres.in/)) for login and user management. The token is stored in `localStorage` for simplicity.
2. **API Integration**: All user data is fetched from the Reqres API. This includes paginated user lists and individual user details.
3. **Error Handling**: Basic error handling is implemented for API calls, but additional improvements may be required for production use.
4. **Styling**: TailwindCSS is used for styling. Ensure you have the necessary PostCSS setup if extending the styles.
5. **Routing**: React Router is used for client-side navigation. Ensure the app is deployed on a platform that supports SPA routing (e.g., Vercel with the provided `vercel.json`).

---

## 🌐 Deployment

The app is configured to be deployed on **Vercel**. The `vercel.json` file ensures proper routing for single-page applications. To deploy:

1. Install the Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy the app:
   ```sh
   vercel
   ```

---

## 🌐 Hosted Application

The application is live and can be accessed at:  
[EmployeeWise - Hosted on Vercel](https://employee-wise-akashs-projects-f10eb71a.vercel.app/)

---