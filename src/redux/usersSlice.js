import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://reqres.in/api/users"; // Added missing API URL

// Fetch users using fetch API
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (page, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_URL}?page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue("Failed to fetch users.");
    }
});

// Fetch Single User
export const fetchUserById = createAsyncThunk("users/fetchUserById", async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        console.log("API Response:", data);
        return data.data;
    } catch (error) {
        return rejectWithValue("Failed to fetch user.");
    }
});

// Update User
export const updateUser = createAsyncThunk("users/updateUser", async ({ id, data }) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {  // ✅ Correct URL
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update user");  // ✅ Handle failure
    }

    const updatedUser = await response.json();

    console.log("Updated User Response:", updatedUser);  // ✅ Debugging

    return { id, ...data };  // ✅ Ensure we return the updated user with ID
});


// Delete User
export const deleteUser = createAsyncThunk("users/deleteUser", async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Deletion failed");
        console.log('deleted');
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        selectedUser: null,
        page: 1,
        totalPages: 1,
        loading: false,
        error: null,
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch User by ID
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
                console.log("User Data Fetched:", state.selectedUser);
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update User
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }

                if (state.selectedUser?.id === action.payload.id) {
                    state.selectedUser = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setPage } = userSlice.actions;
export default userSlice.reducer;
