import * as acTypes from "./Actiontypes.js"
export const initialState={
    Admin_user:null,
    selected_user:null

}
export const Admin_reducer=(state=initialState,action)=>
{
    switch(action.type)
    { 
        case acTypes.set_selected_user:
            return {
                ...state,selected_user:action.payload
            }


        default:
            return state;
    }


}