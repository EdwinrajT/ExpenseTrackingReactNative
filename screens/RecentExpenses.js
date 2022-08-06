import ExpenseOutput from '../component/ExpensesDetail/ExpenseOutput';
import {ExpenceCtxt} from '../store/Expense-Context';
import { useContext } from 'react';
import {diffBwDateDays} from '../util/date';
function RecentExpenses(){
    const expCtxt=useContext(ExpenceCtxt);
    const expContext=expCtxt.expenses.filter((expense)=>{
        const today=new Date();
        const expenseValue=diffBwDateDays(today,7);
        return (expense.date>=expenseValue) && (expense.date<=today);
    })
    return(
       
        <ExpenseOutput expense={expContext} expensePeriod='Last 7 days' textforNoResult='No data found for last 7 days'/>
      
    );
}
export default RecentExpenses;

