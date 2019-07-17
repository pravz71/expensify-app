import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, editExpense, removeExpense } from './actions/expenses';
import { setTextFilter, setStartDate, setEndDate, sortByAmount, sortByDate} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

console.log("App is running...");
const store = configureStore();
store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({
	description: 'Coffee',
	note: 'Note',
	amount: 300,
	createdAt: 323
}));
const expenseTwo =  store.dispatch(addExpense({
	description: 'Tea',
	note: 'Note',
	amount: 234,
	createdAt: 230
}));
const expenseThree =  store.dispatch(addExpense({
	description: 'Tea2',
	note: 'Note',
	amount: 434,
	createdAt: 250
}));
// store.dispatch(setTextFilter('ee'));
// setTimeout(()=>{
// 	store.dispatch(setTextFilter('t'));
// }, 5000);
// store.dispatch(setTextFilter());
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(200));
// store.dispatch(setEndDate(240));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate());

const jsx = (
	<Provider store = {store}>
		<AppRouter/>
	</Provider>
);
// const jsx = (
// 	<AppRouter/>
// );
ReactDOM.render(jsx, document.getElementById('app'));
