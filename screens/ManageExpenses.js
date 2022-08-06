import {View,StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {GlobalStyle} from '../constants/style';
import Button from '../component/UI/Button';
import { useContext, useLayoutEffect } from 'react';
import {ExpenceCtxt} from '../store/Expense-Context';
import ManageExpForm from '../component/ManageExpense/ManageExpForm';
function ManageExpenses({route,navigation}){
    const expenseContxt=useContext(ExpenceCtxt);
    const expensesId=route.params?.expenseId;
    const expIdIsPresent=!!expensesId;
    const selectedExpense=expenseContxt.expenses.find((expense)=>expense.id===expensesId);

    useLayoutEffect(()=>{ navigation.setOptions({
        title:expIdIsPresent?'Edit Expenses':'Add Expenses',
    });},[navigation,expIdIsPresent]);
    function cancelHandler(){
        navigation.goBack();
    }
    function confirmExpense(expenseData){
        if(expIdIsPresent)
        {
            expenseContxt.updateExpenses(expensesId,expenseData);
        }
        else
        {
            expenseContxt.addExpenses(expenseData);
        }
        navigation.goBack();
    }
    function deleteExpense(){
        expenseContxt.deleteExpenses(expensesId);
        navigation.goBack();
    }
    return(
        <View style={styles.container}>
            <ManageExpForm onSubmit={confirmExpense} defaultValue={selectedExpense} submitLabel={expIdIsPresent ? 'Update' : 'Add'} 
            onCancel={cancelHandler}
            />
          
            {
                expIdIsPresent && (
                    <View style={styles.barStyle}>
                        <Ionicons name="trash" color="#af0362" size={24} onPress={deleteExpense}/>
                    </View>
                )
            }

        </View>
    );
}
export default ManageExpenses;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: GlobalStyle.colors.color2,
     padding:30,
    },
    barStyle:
    {
        borderTopWidth:2,
        borderTopColor:GlobalStyle.colors.color1,
        alignItems:'center',
        padding:15,
    },
   

  });