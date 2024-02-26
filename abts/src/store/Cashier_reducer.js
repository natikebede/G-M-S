import * as acTypes from "./Actiontypes.js"
export const initialState=
{
    passenger:[ ],
    Booked_seat:[],
    user:null,
    BookingID:null,
    selected_destination:{},
    selected_seat:[],
    travel_date:null,
    reserved_seat:[]
};

 export const reducer =(state=initialState, action)=>
 {  
     switch(action.type)
    {

        // for adding passangers
        case acTypes.AddPassanger:
          
        return {
            ...state,
            passenger:[...state.passenger,action.payload]
        };

        
        //for removing Passngers



        case acTypes.Remove_passanger:
            if(state.passenger.length<1)
            {
                return {
                    ...state,passenger:[]
                }
            } 
            else{
        return{
            ...state,passenger:state.passenger.filter((pass)=>{return pass.id!=action.payload})
        }
        }




        //booking a seat


        case acTypes.Book_seat:
               { 
                
                    return{
                        ...state,Booked_seat:[...state.Booked_seat,action.payload]
                     }  

                
               }

               

               //removing Booked seat


        case acTypes.Remove_booked_seat:{

            return{
                ...state,Booked_seat:state.Booked_seat.filter(seat=>seat!=action.payload)     
                   }
        }



        //for setting selected destination
        case acTypes.set_selected_destination:
        
            return{
                ...state,selected_destination:action.payload
            };
        //setting reserved  seats
        case acTypes.set_reserved_seats:{
               
            return{
                ...state,reserved_seat:action.payload
            }
        }

            



            //for setting selected seat
            case acTypes.Set_selected_seat:
               { if (action.payload==[])
                {
                    return{
                        ...state,selected_seat:[]
                     }   
                }
                else
                {
                    return{
                        ...state,selected_seat:[action.payload]
                     }  

                }
               }

            
        
          


           //for setting a user   
        case acTypes.set_user:
            return{
                ...state,user:action.payload
            };


            // for setting travel date
            case acTypes.setTravel_date:
                return{
                    ...state,travel_date:action.payload
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
    case acTypes.setBooking_id:{
      
        return{
            ...state,BookingID:action.payload
        }

    }
        default:
            return state;
    }

 }
