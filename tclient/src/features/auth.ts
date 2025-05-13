import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    name: string | null;
    id: string | null;
    profile: string | null;
}

const initialState: User = {
    name: null,
    id: null,
    profile: null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfile: (state, action:PayloadAction<string | null>) => {
            state.profile = action.payload
        },
        setUser: (state, action:PayloadAction<string | null>) => {
            state.name = action.payload
        },
        setUserId: (state, action:PayloadAction<string | null>) => {
            console.log(action.payload)
            state.id = action.payload
        }
    }
});

export const { setUser, setProfile, setUserId} = userSlice.actions;

export default userSlice.reducer;