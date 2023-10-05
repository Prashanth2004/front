import React from 'react'
import { Progress } from 'antd';
const Analytics = ({allTransection}) => {
    const totalTransaction=allTransection.length;
    const totalIncomeTransactions=allTransection.filter(transaction=>transaction.type==="income");
    const totalExpenseTransactions=allTransection.filter(transaction=>transaction.type==="expense");
    const totalIncomePercent=(totalIncomeTransactions.length/totalTransaction)*100;
    const totalExpensePercent=(totalExpenseTransactions.length/totalTransaction)*100;

    const totalTurnover=allTransection.reduce(
        (acc,transaction)=>acc+transaction.amount,0);

    const totalIncomeTurnover=allTransection.filter(
        (transaction)=>transaction.type==='income').
        reduce((acc,transaction)=>acc+transaction.amount,0)

    const totalExpenseTurnover=allTransection.filter(
        (transaction)=>transaction.type==='expense').
        reduce((acc,transaction)=>acc+transaction.amount,0)
    
    const totalIncomeTurnoverPercent=(totalIncomeTurnover/totalTurnover)*100;

    const totalExpenseeTurnoverPercent=(totalExpenseTurnover/totalTurnover)*100;
     
    const categories=[
        "salary",
        "tip",
        "project",
        "food",
        "movie",
        "bills",
        "medical",
        "fee",
        "tax",
    ];
  return (
    <>
    <div className='row m-3'>
        <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                    Total Transactions:{totalTransaction}
                </div>
                <div className='card-body' style={{display:"flex",flexDirection:"row"}}>
                    <div>
                    <h5 className='text-success'>Income:{totalIncomeTransactions.length}</h5>
                    <Progress type='circle' strokeColor={'green'} className="mx-2" percent={totalIncomePercent.toFixed(0)}/>
                    </div>
                    <div style={{marginLeft:"70px"}}>  
                    <h5 className='text-danger'>Expense:{totalExpenseTransactions.length}</h5>
                    <Progress type='circle' strokeColor={'red'} className="mx-2" percent={totalExpensePercent.toFixed(0)}/>
                    </div>
                </div>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                    Total TurnOver:{totalTurnover}
                </div>
                <div className='card-body' style={{display:"flex",flexDirection:"row"}}>
                    <div>
                    <h5 className='text-success'>Income:{totalIncomeTurnover}</h5>
                    <Progress type='circle' strokeColor={'green'} className="mx-2" percent={totalIncomeTurnoverPercent.toFixed(0)}/>
                    </div>
                    <div style={{marginLeft:"70px"}}>
                    <h5 className='text-danger'>Expense:{totalExpenseTurnover}</h5>
                    <Progress type='circle' strokeColor={'red'} className="mx-2" percent={totalExpenseeTurnoverPercent.toFixed(0)}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
   <div className='row mt-3'>
        <div className='col-md-5'>
            <h5>Categorywise Income</h5>
            {
                categories.map((category)=>{
                    const amount=allTransection.filter(transaction=>transaction.type==='income' 
                    && transaction.category===category).
                    reduce((acc,transaction)=>acc+transaction.amount,0);

                    return(
                        amount>0 &&(
                        <div className='card'>
                            <div className='card-body'>
                                <h5>
                                    {category}
                                    <Progress percent={((amount/totalIncomeTurnover)*100).toFixed(0)}/>

                                </h5>
                            
                            </div>
                        </div>
                    ))
            })
            }

        </div>
    <div className='col-md-5'>
            <h5>Categorywise Expense</h5>
            {
                categories.map((category)=>{
                    const amount=allTransection.filter(transaction=>transaction.type==='income' 
                    && transaction.category===category).
                    reduce((acc,transaction)=>acc+transaction.amount,0);

                    return(
                        amount>0 &&(
                        <div className='card'>
                            <div className='card-body'>
                                <h5>
                                    {category}
                                    <Progress percent={((amount/totalExpenseTurnover)*100).toFixed(0)}/>

                                </h5>
                            
                            </div>
                        </div>
                    ))
            })
            }

        </div>
    </div>
    </>
  )
}

export default Analytics
