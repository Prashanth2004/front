import React,{useState,useEffect}from 'react'
import {Modal,Form,Input,Select, message, button, Table, DatePicker} from "antd";
import {UnorderedListOutlined,AreaChartOutlined,EditOutlined,DashOutlined, DeleteOutlined} from "@ant-design/icons";
import Layout from '../components/layouts/Layout'
import Spinner from '../components/Spinner';
import axios from 'axios';
import moment from 'moment';
import Analytics from '../components/Analytics';

const {RangePicker}=DatePicker;
const HomePage = () => {
    const[showModal,setShowModal]=useState(false);
    const [loading,setLoading]=useState(false);
    const[allTransection,seAllTransection]=useState(false);
    const[frequency,setFrequency]=useState('7');
    const[selectedDate,setSelectedDate]=useState([])
    const[viewData,setViewData]=useState('table')
    const[editable,setEditable]=useState(null)
    
    const columns=[
      {
        title:'Date',
        dataIndex:'date',     
        render:(text)=><span>{moment(text).format("YYYY-MM-DD")}</span>
      },
      {
        title:'Amount',
        dataIndex:'amount'       
      },
      {
        title:'Type',
        dataIndex:'type'
      },
      {
        title:'Category',
        dataIndex:'category'       
      },
      {
        title:'Refernce',
        dataIndex:'refernce'       
      },
      {
        title:'Actions',  
        render:(text,record)=>(
          <div>
            <EditOutlined onClick={()=>{
            setEditable(record)
            setShowModal(true)
            }}/>
            <DeleteOutlined className='mx-2' onClick={()=>handleDelete(record)}/>
          </div>
        )
      },

      ]
    useEffect(()=>{
      const getAllTransections=async()=>{
        try{
        const user=JSON.parse(localStorage.getItem('user'))
        setLoading(true)
        const res=await axios.post('/transections/get-transection',
        {userid:user.user._id,
        frequency:frequency,
        //selectedDate,
        }
        );
        console.log(res.data)
        setLoading(false);
        seAllTransection(res.data)
        }
        catch(error){
          console.log(error)
          message.error('failes to get transaction')
        }
      };
        getAllTransections();
    },[frequency,selectedDate]);

    const handleDelete=async(record)=>{
      try{
        await axios.post('/transections/delete-transection',{transacationId:record._id})
        setLoading(false)
         message.success('Transaction Deleted')
      }
      catch(error){
        setLoading(false)
        console.log(error)
        message.error("unable to delete")
      }
    }
    const onFinish = async(values)=>{
     try{
      const user=JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      if(editable){
        console.log("checking")
        await axios.post('/transections/edit-transection',{
          payload:{
          ...values,userId:user.user._id
        },
        transacationId:editable._id
        });
        setLoading(false)
        message.success("Transaction updated succesfully");
      }
      else{
        await axios.post('/transections/add-transection',{
          ...values,userid:user.user._id
        });
        setLoading(false)
        message.success("Transaction added succesfully")
      }
      setShowModal(false)
      setEditable(null)
    }
     catch(error){
     setLoading(false)
         message.error('failes to add transaction')
      }
     }
  return (
    <>
    <Layout>
      {loading &&<Spinner/>}
    <div className='filters'>
        <div>
          <h6>Select frequency</h6>
          <Select value={frequency} onChange={(values)=>setFrequency(values)}>
            <Select.Option value="7">Last 1 week</Select.Option>
            <Select.Option value="30">Last 1 month</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
            <Select.Option value='custom'>Custom</Select.Option>
          </Select>
          {frequency==='custom' && (<RangePicker value={selectedDate} 
          onChange={(values)=>setSelectedDate(values)}/>
        )}
        </div>
        <div className='switch-icons'>
          <UnorderedListOutlined className={`mx-2 ${viewData==='table'?'active-icon':'inactive-icon'}`}
          onClick={()=>setViewData('table')}/>
          <AreaChartOutlined className={`mx-2 ${viewData==='analytics'?'active-icon':'inactive-icon'}`}
          onClick={()=>setViewData('analytics')}/>
        </div>
        <div>
          <button className='btn btn-primary'onClick={()=>setShowModal(true)}>
          Add new
          </button>
          </div>   
      </div>
      <div className='content'>
        {viewData ==='table'?
        <Table columns={columns} dataSource={allTransection}/>
        :<Analytics allTransection={allTransection}/>
          }
      </div>
      <Modal title={editable?'Edit Transaction':'Add Transection'} 
      visible={showModal}
      onCancel={()=> setShowModal(false)} 
      footer={false}>
       <Form layout='vertical' onFinish={onFinish} intialValues={editable}>
        <Form.Item label='Amount' name="amount">
        <Input type='text'/>
        </Form.Item>
        <Form.Item label='type' name="type">
        <Select>
            <Select.Option value='income'>Income</Select.Option>
            <Select.Option value='expense'>Expense</Select.Option>   
        </Select>
        </Form.Item>
        <Form.Item label='Category' name="category">
        <Select>
            <Select.Option value='salary'>Salary</Select.Option>
            <Select.Option value='tip'>Tip</Select.Option>  
            <Select.Option value='project'>Project</Select.Option> 
            <Select.Option value='food'>Food</Select.Option> 
            <Select.Option value='movie'>Movie</Select.Option> 
            <Select.Option value='bills'>Bills</Select.Option> 
            <Select.Option value='medical'>Medical</Select.Option>  
            <Select.Option value='fee'>Fee</Select.Option> 
            <Select.Option value='tax'>Tax</Select.Option> 
        </Select>
        </Form.Item>
        <Form.Item label='Date' name="date">
        <Input type='date'/>
        </Form.Item>
        <Form.Item label='Refrence' name="refernce">
        <Input type='text'/>
        </Form.Item>
        <Form.Item label='Description' name="description">
        <Input type='text'/>
        </Form.Item>
        <div className='d-flex justify-content-end'> 
            <button type='submit' className='btn btn-primary'>
              {" "}SAVE
              </button>
        </div>
    </Form>
    </Modal>
    </Layout>
      </>
    
  )
}

export default HomePage
