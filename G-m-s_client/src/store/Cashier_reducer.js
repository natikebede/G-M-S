import * as acTypes from "./Actiontypes.js"
export const initialState=
{
   
    user:null,
    selected_memeber:null,
   
 
};

 export const reducer =(state=initialState, action)=>
 {  
     switch(action.type)
    {
        
           //for setting a user   
        case acTypes.set_user:
            return{
                ...state,user:action.payload
            };
       

        case acTypes.set_selected_member:{
            return{
                    ...state,
                    selected_memeber:action.payload
            }
        }    
// reseting state after print 
case acTypes.Reset_State:
    {
        return{
            ...state,passenger:[ ],
            Booked_seat:[],
            BookingID:null,
            selected_destination:{},
            selected_seat:[],
                     
        }
    }
        // setting booking number    
  
        default:
            return state;
    }

 }
