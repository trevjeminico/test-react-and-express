import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "../api/axios";
export const createTask = createAsyncThunk("task/create", async (args) => {
  const req = await axios.post("/v1/tasks/create-task", args);
  const res = await req.data;
  return res;
});

export const updateTask = createAsyncThunk("task/update", async (params) => {
  const req = await axios.patch("/v1/tasks/update-task", params);
  const res = await req.data;
  return res;
});

// export const deleteTask = createAsyncThunk(
//   "task/delete",
//     async (params) => {
//       const req = await axios.post("/v1/auth/register", params);
//       const res = await req.data;
//       return res;
//     }
// );

export const taskStatusCode = createAsyncThunk("task/code/fetch", async () => {
  const req = await axios.get("/v1/taskstatus/taskcodes");
  const res = await req.data;
  return res;
});

export const getAllUserTask = createAsyncThunk(
  "user/task/all",
  async (args, { rejectWithValue }) => {
    try {
      const { userId } = args;
      const req = await axios.get(`/v1/tasks/user-task/${userId}`);
      const res = await req.data;
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getTaskbyId = createAsyncThunk(
  "task/edit",
  async (args, { rejectWithValue }) => {
    try {
      const { taskId } = args;
      const req = await axios.get(`/v1/tasks/edit-task/${taskId}`);
      const res = await req.data;
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          taskStatusCode.pending,
          createTask.pending,
          getTaskbyId.pending,
          getAllUserTask.pending
        ),
        (state, action) => {
          switch (action.type) {
            case "task/code/fetch/pending":
              state.isLoading = true;
              state.error = null;
              break;
            default:
              state.isLoading = false;
              state.error = null;
              break;
          }
        }
      )
      .addMatcher(
        isAnyOf(
          taskStatusCode.fulfilled,
          createTask.fulfilled,
          getTaskbyId.fulfilled,
          getAllUserTask.pending
        ),
        (state, action) => {
          switch (action.type) {
            case "task/code/fetch/fulfilled":
              state.isLoading = false;
              state.error = null;
              break;
            default:
              state.isLoading = true;
              state.error = null;
              break;
          }
        }
      )
      .addMatcher(
        isAnyOf(
          taskStatusCode.rejected,
          createTask.rejected,
          getTaskbyId.rejected,
          getAllUserTask.rejected
        ),
        (state, action) => {
          switch (action.type) {
            case "task/code/fetch/rejected":
              state.isLoading = false;
              state.tokenAuth = null;
              state.error = null;
              break;
            default:
              state.isLoading = false;
              state.error = null;
              break;
          }
        }
      );
  },
});

export default taskSlice.reducer;
