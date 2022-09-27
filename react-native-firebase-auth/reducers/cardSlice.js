import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cardService from "../services/cardsServices";

const initialState = {
  loading: false,
  error: false,
  success: false,
  cards:{},
  message: ''

}

export const getCardsList = createAsyncThunk(
  'packs/getAll',
  async () => {
    try {
      return await cardService.getCards()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

    export const createPackage = createAsyncThunk(
      'packs/create',
      async (goalData) => {
        try {
          return await cardService.createPackage(goalData)
        } catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)
        }
      }
    )

    export const deletePackage = createAsyncThunk(
      'pack/delete',
      async (id) => {
        try {
          return await cardService.deletePack(id)
        } catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)
        }
      }
    )
    export const updatePackage = createAsyncThunk(
      'pack/update',
      async (goalData) => {
        try {
          return await cardService.updatePack(goalData)
        } catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)
        }
      }
    )
    
    const cardSlice = createSlice({
      name: "card",
      initialState,
      reducers: {
        //reset: (state) => initialState,
      }, 
        extraReducers:  (builder) => {
        builder
          .addCase(createPackage.pending, (state) => {
            state.loading = false
          })
          .addCase(createPackage.fulfilled, (state, action) => {
            state.loading = false
             state.success= true
            state.cards.push(action.payload)
          })
          .addCase(createPackage.rejected, (state, action) => {
            state.loading = false
            state.error= ''
            state.message = action.payload
          })
          .addCase(getCardsList.pending, (state) => {
            state.loading = true
          })
          .addCase(getCardsList.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.cards = action.payload
          })
          .addCase(getCardsList.rejected, (state, action) => {
            state.loading = false
            state.error = true
            state.message = action.payload
          })
          .addCase(deletePackage.pending, (state) => {
            state.loading = true
          })
          .addCase(deletePackage.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.cards = state.cards.filter(
              (card) => card._id !== action.payload.id
            )
          })
          .addCase(deletePackage.rejected, (state, action) => {
            state.loading = false
            state.error = true
            state.message = action.payload
          })
          .addCase(updatePackage.pending, (state) => {
            state.loading = true
          })
          .addCase(updatePackage.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
              state.cards = state.cards.map((item) =>
                item._id === id ? action.payload : item
              );
          })
          .addCase(updatePackage.rejected, (state, action) => {
            state.loading = false
            state.error = true
            state.message = action.payload
          })
      },
    });

    export const {reset} = cardSlice.actions 
export default cardSlice.reducer;
