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
        case acTypes.reset_selected:
            return{

            ...state,selected_emp:null,
                selected_emp:null
        }
        default:
            return state;
    }


}