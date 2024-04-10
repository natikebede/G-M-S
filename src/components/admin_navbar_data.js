
import AddBoxIcon from '@mui/icons-material/AddBox';
import DvrIcon from '@mui/icons-material/Dvr';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import CommuteIcon from '@mui/icons-material/Commute';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
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
            path:"/Admin/view-memebership",
            name:" view Memebership",
            icon:<DvrIcon />
            },
      
            {
                path:"/Admin/Payment-reports",
                name:"Payment reports",
                icon:<AutoGraphIcon />
                },
                {
                    path:"/Employee",
                    name:"HR",
                    icon:<PersonAddAltIcon />
                    },
                    {
                        path:"/Membership-configration",
                        name:"configration",
                        icon:<SettingsSuggestIcon/>
                        },
    ];
    export default Admin_NavItem ;