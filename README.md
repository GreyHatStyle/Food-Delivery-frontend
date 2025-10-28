# ZOMIGGY, Food Delivery Web App (FrontEnd)
Developed a food delivery Web app, using Swiggy Restaurant Kaggle dataset having **5,000+ restaurants** across **6 cities**.
- **Live Demo**: https://food-delivery-frontend-lake.vercel.app/
- **Backend Django Github Repo:** https://github.com/GreyHatStyle/Food-Delivery-Backend
- Kaggle Dataset Link: https://www.kaggle.com/datasets/ashishjangra27/swiggy-restaurants-dataset
- Headless Website:
  - ***Frontend*** is deployed in **Vercel**.
  - ***Backend*** is deployed separately in **Digital Ocean** droplet.
  
![zomiggy](https://github.com/user-attachments/assets/7254d4d9-d3ae-4c3e-9a9f-1cd875fafe84)


## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Backend RestAPI Docs](#backend-restapi-docs)
- [Feedback](#feedback)
- [Author](#author)


## Features
- **Uses decoupled architecture** with RestAPIs, allowing independent development and deployment.
- **Supports URL queries**, so that the filtered restaurant's URL can be shared with other users to open the same page.
- **Paginated List** of restaurants is displayed in the frontend.
- **Timed Caching** for menu items in restaurant menu. 

## Technology Stack
1. **Tanstack React Router**: Provides file-based and type-safe URLs, with many important hooks and features for navigation, serializing URL params, dynamic routing, etc.
2. **Tanstack React Query**: Provides hooks and features to manage response states received from Backend APIs, supports a caching mechanism for received data, etc.
3. **Zustand**: Provides global state management features and store management for session storage, local storage, cookies, etc. It's more lightweight and performant than the useContext API.
4. **Zod**:  Provides utilities to design user-defined schemas that can be used to validate API responses, URL params, etc. Also supports Schema to Type conversion in TypeScript, ensuring type-safety.
5. **ShadCN**: Provides inbuilt general components for faster development with Tailwind Merge and clsx support, to ensure reusability. 
6. **React Joyride**: Provides a simple component and utilities to set up guided tours or walkthroughs, with configuration support.

## Backend RestAPI Docs
Restful APIs are the only way to interact, configure filters in the website, select items, etc. Hence, an API doc is also developed for reference during development.
\
**API DOC LINK:** https://manasbishtsecond.me/docs

## Feedback
If you have any feedback, please reach out to me at manasbisht1142004@gmail.com.


## Author

- [@GreyHatStyle(Manas Bisht)](https://github.com/GreyHatStyle)