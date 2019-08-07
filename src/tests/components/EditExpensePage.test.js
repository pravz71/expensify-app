import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, startRemoveExpense, history, wrapper;
beforeEach(() => {
	editExpense = jest.fn();
	startRemoveExpense = jest.fn();
	history =  { push: jest.fn() };
	wrapper = shallow(
		<EditExpensePage
			expense={expenses[2]}
			startRemoveExpense={startRemoveExpense}
			editExpense={editExpense} 
			history={history}
		/>
	);	
});

test('should render EditExpensePage correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense correctly', () => {
	const updates = {
		description: 'Random Stuff',
		note: 'Random Note'
	};
	wrapper.find('ExpenseForm').prop('onSubmit')(updates);
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, updates);
});

test('should handle startRemoveExpense correctly', () => {
	wrapper.find('button').simulate('click');
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[2].id});
});