import { UserType } from '@/types/user/user';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    user: UserType | null
}

const storageUser = localStorage.getItem("authUser")

const initialState: AuthState = {
    user: storageUser ? (JSON.parse(storageUser) as UserType) : null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{}
})

export default authSlice.reducer