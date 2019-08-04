import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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

test('should setup add expense action object with provided values', () => {
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	});
});

test('should add expense to database and store', (done) => {
	const store = createMockStore({});
	const expenseData = {
		description: 'Rent',
		amount: 1234,
		createdAt: 3000,
		note: 'Random Note'
	};

	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});
		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});
});

test('should add expense with defaults to database and store', (done) => {
	const store = createMockStore({});
	const expenseDefaults = {
		description: '',
		amount: 0,
		createdAt: 0,
		note: ''
	};

	store.dispatch(startAddExpense({})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseDefaults
			}
		});
		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseDefaults);
		done();
	});
});

// test('should set up add expense action object',() => {
// 	const expenseData = {
// 		description: 'Rent',
// 		amount: 1234,
// 		createdAt: 3000,
// 		note: 'Random Note'
// 	}
// 	const action = addExpense(expenseData);
// 	expect(action).toEqual({
// 		type: 'ADD_EXPENSE',
// 		expense: {
// 			...expenseData,
// 			id : expect.any(String)
// 		}
// 	});
// });

// test('should set up add expense action object defaults',() => {
// 	const expenseExpectedData = {
// 		description: '',
// 		amount: 0,
// 		createdAt: 0,
// 		note: ''
// 	}
// 	const action = addExpense();
// 	expect(action).toEqual({
// 		type: 'ADD_EXPENSE',
// 		expense: {
// 			...expenseExpectedData,
// 			id : expect.any(String)
// 		}
// 	});
// });