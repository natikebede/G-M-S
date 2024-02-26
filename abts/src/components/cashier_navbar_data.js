
import AddBoxIcon from '@mui/icons-material/AddBox';
import DvrIcon from '@mui/icons-material/Dvr';
import CommuteIcon from '@mui/icons-material/Commute';
import AssessmentIcon from '@mui/icons-material/Assessment';

const NavItem=[
    {
    path:"/dashbord",
    name:"Dashbord",
    icon:<AssessmentIcon />
    },
    {
        path:"/Makereservation",
        name:"Make reservation",
        icon:<AddBoxIcon />
        },
        {
            path:"/view-Reservation",
            name:" view reservation",
            icon:<DvrIcon />
            },
            {
                path:"/View-trips",
                name:"View trips",
                icon:<CommuteIcon />
                },
    ];
    export default NavItem;