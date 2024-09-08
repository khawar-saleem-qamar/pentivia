import {createSlice} from "@reduxjs/toolkit"
import {fetchApi} from "../components/helpers/requestHelpers"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null
    },
    reducers: {
        login: (state, action)=>{
            state.data = action.payload
        },
        logout: async (state)=>{
            const fcmTokenData = {
                userid: state.data._id,
                fcmtoken: state.data.fcmtoken
              };
            //   const formData = new FormData();
            //     formData.append("userid", state.data._id);
            //     formData.append("fcmtoken", state.data.fcmtoken);
              await fetchApi(`/auth/deleteFcmToken`, 'PATCH', fcmTokenData, async (success, res)=>{
                  if(!success){
                    alert("Unable to logout")
                  }else{
                    // state.data = null
                  }
              });
        
        }
    }
})

export const {login, logout} = userSlice.actions;

export const selectUser = (state) => state.user.data;

export default userSlice.reducer;