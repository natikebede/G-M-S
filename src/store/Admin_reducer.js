import * as acTypes from "./Actiontypes.js"
export const initialState={
    Admin_user:null,
    selected_user:null,
    selected_emp:null

}
export const Admin_reducer=(state=initialState,action)=>
{
    switch(action.type)
    { 
        case acTypes.set_selected_user:
            return {
                ...state,selected_user:action.payload
            }
        case acTypes.set_selected_emp:
            return{

            ...state,selected_emp:action.payload
        }

        default:
            return state;
    }


}