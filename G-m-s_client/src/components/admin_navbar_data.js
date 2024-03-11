
import AddBoxIcon from '@mui/icons-material/AddBox';
import DvrIcon from '@mui/icons-material/Dvr';
import CommuteIcon from '@mui/icons-material/Commute';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
const Admin_NavItem=[
    {
    path:"/Admin__dashbord",
    name:"Dashbord",
    icon:<AssessmentIcon />
    },
    {
        path:"/Manage_Cashiers",
        name:"Cashiers",
        icon:<PersonAddAltIcon />
        },
    {
        path:"/Create_trip",
        name:"Trips",
        icon:<AddBoxIcon />
        },
        {
            path:"/All-Reservation",
            name:" Reservation",
            icon:<DvrIcon />
            },
            {
                path:"/Bus",
                name:"Add Bus",
                icon:<DirectionsBusIcon />
                },
                {
                    path:"/Drivers",
                    name:"Driver",
                    icon:<PersonAddAltIcon />
                    },
    ];
    export default Admin_NavItem ;