import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// We have a named export as we want to test the unconnected version
export const ExpenseList = (props) => (
	<div>
		{
			props.expenses.length === 0 ? (
				<p>No Expenses</p>
			) : (
				props.expenses.map((expense) => {
					return (<ExpenseListItem key = {expense.id} {...expense} />);
				})
			)
		}
	</div>
); 

// const ConnectedExpenseList = connect((state) => {
// 	return {
// 		expenses: state.expenses
// 	};
// })(ExpenseList); //connect() returns a function and in that we pass our component
// export default ConnectedExpenseList;

// The above commented code is the same as the below code we have taken 
// the function and created a new variable and passed it instead to connect()

const mapStateToProps = (state) => {
	return {
		expenses: selectExpenses(state.expenses, state.filters)
	};
};

export default connect(mapStateToProps)(ExpenseList);

