import { createSlice } from '@reduxjs/toolkit';
import { fakeData } from '../fakeData'

const userSlice = createSlice({
    name: "user",
    initialState: { value: fakeData },
    reducers: {
        addUser: (state, action) => {
            state.value.unshift(action.payload);
        },
        deleteUser: (state, action) => {
            state.value = state.value.filter(user => user.id !== action.payload)
        },
        updateUser: (state, action) => {
            state.value = state.value.map(user => {
                if (user.id === action.payload.user.id) {
                    user.username = action.payload.updatedUsername
                }
                return user;
            })
        }

    }
})

export default userSlice.reducer;
export const { addUser, deleteUser, updateUser } = userSlice.actions;