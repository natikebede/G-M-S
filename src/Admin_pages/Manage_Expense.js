import React ,{ useEffect ,useState} from 'react'
import TitleHeader from '../components/TitleHeader'
import { BarChart } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import SimpleBackdrop from '../components/SimpleBackdrop';
import AddIcon from '@mui/icons-material/Add';
import PaidIcon from '@mui/icons-material/Paid';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { RefreshOutlined } from '@mui/icons-material';
import { get_today_sales_cashier} from '../functions/counts_sales';
import Modals from '../components/Modals';
import { reset_state,set_user } from '../store/Actions';
import { expense_filter, get_monthly_sales_admin, get_sum_expense_monthly, get_sum_expense_today } from '../functions/admin_functions';
import Admin_detail_cards from '../components/Admin_detail_cards'
import api from '../Apis/api';
import SearchIcon from '@mui/icons-material/Search';
import PaymentsIcon from '@mui/icons-material/Payments';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import View_expense_report from '../components/View_expense_report';
function Manage_Expense() {
    const [gadget, setGadget]= useState({
        todaySales:0.00,
        todays_Expense:0.00,
        monthly_Sales:0.00,
        Monthly_Expense:0.00
      });
      const[filter_info,setinfo]= useState({
        from_date:null,
        to_date:null,
    });
 
    
    //change handeler for the form
    const onhandelChange=(e)=>{
      setinfo(
        (prev)=>({
            ...prev,
            [e.target.name]:e.target.value,
        }));}
  const dispatch= useDispatch();
  const [results,setResults]=useState(null)
  const [error_text, settext] = useState('');
  const [error_type, settype] = useState('success');
  const [error_alert, setAlert] = useState(false);
  const [user,setAccount]= useState(useSelector(state=>state.cashier_reducer.user));
  const navigate =useNavigate();

    const handelrefresh=()=>{
      setAlert(false);
      setResults(null)
      get_expense();
  };
       // handel submit
    const handel_submit=(e)=>{
      e.preventDefault();
      if(filter_info.from_date==null && filter_info.to_date==null )
      {
        settext("Please set filter paramenters");
          setAlert(true);
          settype("error");
          
      }
      else if(filter_info.from_date==null && filter_info.to_date!==null)
      {
        settext("Please Make sure start date is selected first");
        setAlert(true);
        settype("error");
      }
        else{
      setAlert(false);
      expense_filter(filter_info,user).then ((response)=>{
        setResults(null);
            if( response.data.status=="success")
            {
              setResults(response.data.data)
            }
            else{
              setAlert(true);
        settype("error");
        settext(response.data.message);
            }

      })
      
        }
  }
    // api request to the server to get all the expense
    const get_expense=async()=>{
      const response= await api.post("/Expense/Get-All-Expense");
      if(response.data.status=="success"){
    
          setResults(response.data.data)
      }
      else{
        setAlert(true);
        settype("error");
        settext(response.data.message);
      }

    }
    const nf = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ETB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    const set_detail_cards=()=>{
        get_today_sales_cashier(user?.account_id,"Default",user?.role).then((res)=>{
            setGadget((prev)=>(
              {
                ...prev,
                todaySales:res.sum
              }
            ))
        })
        get_monthly_sales_admin("Default").then((res)=>{
            setGadget((prev)=>(
              {
                ...prev,
                monthly_Sales:res.sum
              }
            ))
        })
        get_sum_expense_today().then((res)=>{
          setGadget((prev)=>(
            {
              ...prev,
              todays_Expense:res.sum
            }
          ))
        })
        get_sum_expense_monthly().then((res)=>{
          setGadget((prev)=>(
            {
              ...prev,
              Monthly_Expense:res.sum
            }
          ))

        })
    }
    useEffect(()=>{
      const user=localStorage.getItem("g-m-s_account")
      if(user!=null)
      {
        dispatch(set_user(JSON.parse(user)));
        
        setAccount(JSON.parse(user))
        if(user!==null)
        {
          set_detail_cards();
          get_expense();
        }
      }
      else{
          navigate("/");
      }
      
      },[user])
    
  return (
    <div className=' container-fluid p-4'>
        <div className='top_title_container row p-2'>
        <TitleHeader title="Expense" icon={<BarChart/>}/>
        </div>
        
        <div className='row px-2 mt-4'>
            <div className='col-sm-12 col-md mx-auto my-2' >
                <Admin_detail_cards title=" Sales | ETB" today_value={nf.format(gadget.todaySales)} montly_value={nf.format(gadget.monthly_Sales)} Icon={<PaidIcon className='text-success' fontSize='large'/>} time="Today"/>
            </div>
            <div className='col-sm-12 col-md mx-auto my-2' >
                <Admin_detail_cards title=" Expense | ETB" today_value={nf.format(gadget.todays_Expense)} montly_value={nf.format(gadget.Monthly_Expense)} Icon={<PaymentsIcon className='text-danger' fontSize='large'/>} time="Today"/>
            </div>
            <div className='col-sm-12 col-md mx-auto my-2' >
                <Admin_detail_cards title=" Net Profit | ETB" today_value={nf.format(gadget.todaySales-gadget.todays_Expense)} montly_value={nf.format(gadget.monthly_Sales-gadget.Monthly_Expense)} Icon={<WaterfallChartIcon className='text-primary' fontSize='large'/>} time="Today"/>
            </div>

        </div>
        <div className="cv_searchbar_container row  mt-3 p-1">
        { error_alert &&<Modals type={error_type} text={error_text}/>}

       
        <div className=' col-sm-12 col-md-10  '>
        <form className=' col-sm-12  ' onSubmit={handel_submit}>
              <div className='row'>

              
              <div  className='col-sm-12 col-md'>
                <label className='fw-bolder'>From:</label>
                <input className='form-control' type="date" value={filter_info.from_date}onChange={onhandelChange} name="from_date"/>
              </div>
              <div  className=' col-sm-12 col-md'>
                <label className='fw-bolder'>To :</label>
                <input className='form-control' type="date" value={filter_info.to_date} onChange={onhandelChange} name="to_date"/>
              </div>
          
              <div className=' col-sm-12 col-md py-3'>
              <button type="submit" className='filter_search_button'><SearchIcon/>  Search</button>
              
              </div>
              </div>
              </form>
            
        </div>
        <div className=' col-sm-12 col-md-2 p-0'>
        <div className='d-grid gap-2'>
        <button className=' btn btn-primary btn-block fw-bold' onClick={()=>navigate("/Admin/Expense/Add")}><AddIcon/>Add Expense</button>
        <button className=' btn btn-success btn-block fw-bold'><RequestQuoteIcon/> Manage Quote</button>
        <button className=' btn btn-info  btn-block text-white w-100 fw-bold' onClick={handelrefresh}><RefreshOutlined/>Refresh</button>

        </div>
        </div>
        <div className='container-fluid  px-2   mt-3'>
        { results ? <View_expense_report results={results} setAlert={setAlert} settype={settype}settext={settext} refresh={handelrefresh}/>:<SimpleBackdrop/> }

        </div>

        </div>
    </div>
  )
}

export default Manage_Expense
