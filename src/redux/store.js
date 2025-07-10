import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '@/redux/slices/categorySlice';
import companyReducer from '@/redux/slices/companySlice';
import authReducer from '@/redux/slices/authSlice';
import userReducer from "@/redux/slices/userSlice";
import storyReducer from "@/redux/slices/storySlice";
import siteDetailReducer from "@/redux/slices/siteDetailSlice"

const store = configureStore({

    reducer: {
        categories: categoryReducer,
        companies: companyReducer,
        auth: authReducer,
        user: userReducer,
        story: storyReducer,
        siteDetail: siteDetailReducer
    }
    
});


export default store;
