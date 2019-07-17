import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should set up remove expense action object', () => {
	const action = removeExpense( {id : 'qwerty'} );
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: 'qwerty'
	});
});

test('should set up edit expense action object', () => {
	const action = editExpense('qwerty', {note: 'This is new note.'});
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: 'qwerty',
		updates: {
			note: 'This is new note.'
		}
	});
});

test('should set up add expense action object',() => {
	const expenseData = {
		description: 'Rent',
		amount: 1234,
		createdAt: 3000,
		note: 'Random Note'
	}
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id : expect.any(String)
		}
	});
});

test('should set up add expense action object defaults',() => {
	const expenseExpectedData = {
		description: '',
		amount: 0,
		createdAt: 0,
		note: ''
	}
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseExpectedData,
			id : expect.any(String)
		}
	});
});