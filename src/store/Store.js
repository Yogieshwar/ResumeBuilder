import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slice/AuthSlice';
import  resumeReducer from '../slice/ResumeSlice';

export const store=configureStore({
    reducer:{
        auth:authReducer,
        resume:resumeReducer,

    }
})