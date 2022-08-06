import { createContext, useReducer } from "react";

const DUMMYDATA=[{
    id:'e1',
    description:'Book',
    amount:20,
    date:new Date('2022-08-01'),
},
{
    id:'e2',
    description:'Pen',
    amount:10.30,
    date:new Date('2022-08-03'),
},
{
    id:'e3',
    description:'Mouse',
    amount:200,
    date:new Date('2022-07-10'),
},
{
    id:'e4',
    description:'Book & sancks',
    amount:205.23,
    date:new Date('2022-07-29'),
},
{
    id:'e5',
    description:'Books',
    amount:57.89,
    date:new Date('2022-06-01'),
},
{
    id:'e6',
    description:'Pencil',
    amount:10.30,
    date:new Date('2022-08-04'),
},
{
    id:'e7',
    description:'Mouse',
    amount:250,
    date:new Date('2022-07-08'),
},
{
    id:'e8',
    description:'Book',
    amount:50,
    date:new Date('2022-07-02'),
},
{
    id:'e9',
    description:'Book',
    amount:50,
    date:new Date('2022-07-02'),
}
];
export const ExpenceCtxt=createContext({
    expenses:[],
    addExpenses:({description,amount,date})=>{},
    deleteExpenses:(id)=>{},
    updateExpenses:(id,{description,amount,date})=>{},
});

function expenceReducer(state,action){
    switch (action.type){
        case 'ADD':
            const id=new Date().toString()+Math.random().toString();
            return [{...action.payload,id:id},...state]
        case 'DELETE':
            return state.filter((expense)=>expense.id!==action.payload)
        case 'UPDATE':
            const expenseValueIndex=state.findIndex((expense)=>expense.id===action.payload.id);
            const expenseValue=state[expenseValueIndex];
            const updatableExpense= {...expenseValue,...action.payload.data};
            const updatedExpense=[...state];
            updatedExpense[expenseValueIndex]=updatableExpense;
            return updatedExpense;
        default:
    }
}

function ExpenseContext({children}){
    const [expenseState,dispatch]=useReducer(expenceReducer,DUMMYDATA);
    function addExpenses(expenceData){
        dispatch({type:'ADD',payload:expenceData});
    }
    function deleteExpenses(id){
        dispatch({type:'DELETE',payload:id});
    }
    function updateExpenses(id,expenceData){
        dispatch({type:'UPDATE',payload:{id:id,data:expenceData}});
    }
    const value={
        expenses:expenseState,
        addExpenses:addExpenses,
        deleteExpenses:deleteExpenses,
        updateExpenses:updateExpenses,
    }
    return <ExpenceCtxt.Provider value={value}>{children}</ExpenceCtxt.Provider>
}
export default ExpenseContext;