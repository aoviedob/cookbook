import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;
        default:
            return state;
    }
};
const categoryFilter = (state = {id: 0, name: 'Category'}, action) => {
    switch (action.type) {
        case types.FILTER:
            return action.categoryFilter;
        default:
            return state;
    }
};
const recipes = (state = [
	{id: '1', category: 1, stars: '4', rating: '4.7', preparation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae blandit sem. Etiam imperdiet malesuada elementum. Proin posuere leo elementum dolor tincidunt hendrerit. Curabitur a eros in odio cursus tempus vel eu quam. Vivamus volutpat tristique augue vel ornare. Nulla vitae bibendum risus. Duis vulputate neque sed eros pulvinar euismod.', chef: 'Jean Pier', categoryname: 'Pastas', name: 'Recipe 1', ingredients: [{name: 'Ingredient', amount: '1 Kg', recipeId: '1', id: '1'}, {name: 'Ingredient 2', amount: '1 Kg', recipeId: '1', id: '2'}, {name: 'Ingredient 3', amount: '1 Kg', recipeId: '1', id: '3'}, {name: 'ingredient 4', amount: '1 Kg', recipeId: '1', id: '4'}]},
  	{id: '2', category: 2, stars: '5', rating: '5', preparation: 'Search it', chef: 'Jean Pier', categoryname: 'Salads', name: 'Recipe 2', ingredients: []},
  	{id: '3', category: 1, stars: '5', rating: '5', preparation: 'Search it', chef: 'Jean Pier', categoryname: 'Pastas', name: 'Recipe 3', ingredients: []},
  	{id: '4', category: 3, stars: '5', rating: '5', preparation: 'Search it', chef: 'Jean Pier', categoryname: 'Meat', name: 'Recipe 4', ingredients: []},
  	{id: '5', category: 4, stars: '5', rating: '5', preparation: 'Search it', chef: 'Jean Pier', categoryname: 'Deserts', name: 'Recipe 5', ingredients: []},
  	{id: '6', category: 4, stars: '5', rating: '5', preparation: 'Search it', chef: 'Jean Pier', categoryname: 'Deserts', name: 'Recipe 6', ingredients: []}
], action) => {
    switch (action.type) {
        case types.FETCH_RECIPES_PENDING:
            return state;
        case types.FETCH_RECIPES_FULFILLED:
            return action.payload;
        case types.FETCH_RECIPES_REJECTED:
            return state;
        case types.ADD_RECIPE:
            return state;
        case types.ADD_RECIPE_SUCCESS:
            return state;
        case types.ADD_RECIPE_REJECTED:
            return state;
        case types.REMOVE_RECIPE:
            return state;
        case types.REMOVE_RECIPE_SUCCESS:
            return state;
        case types.REMOVE_RECIPE_REJECTED:
            return state;
        case types.UPDATE_HOT_RECIPE:
            return action.recipes;
        default:
            return state;
    }
};
const categories = (state = [
   /* { name: 'Category', id: 0 },
    { name: 'Pastas', id: 1},
    { name: 'Salads', id: 2},
    { name: 'Meat', id: 3},
    { name: 'Desserts', id: 4} */
], action) => {
    switch (action.type) {
        case types.FETCH_CATEGORIES_PENDING:
            return state;
        case types.FETCH_CATEGORIES_FULFILLED:
            return action.payload;
        case types.FETCH_CATEGORIES_REJECTED:
            return state;
        default:
            return state;
    }
};
const modal = (state = {id: 0, category: '', preparation: '', chef: '', categoryname: '', name: '', ingredients: []}, action) => {
    switch (action.type) {
        case types.OPEN_MODAL:
            return action.attachedObject;
        case types.CLOSE_MODAL:
            return action.attachedObject;
        case types.FORM_CHANGE:
            return action.object;
        default:
            return state;
    }
};
const ingredients = (state = [{id: 0, name: '', amount: '', recipeid: 1}], action) => {
    switch (action.type) {
        case types.ADD_INGREDIENT:
            return action.ingredients;
        case types.REMOVE_HOT_INGREDIENT:
            return action.ingredients;
        case types.REMOVE_INGREDIENT:
            return state;
        case types.REMOVE_INGREDIENT_SUCCESS:
            return state;
        case types.REMOVE_INGREDIENT_REJECTED:
            return state;
        case types.FETCH_INGREDIENTS:
            return action.ingredients;
        case types.FETCH_INGREDIENTS_PENDING:
            return state;
        case types.FETCH_INGREDIENTS_FULFILLED:
            return action.payload;
        case types.FETCH_INGREDIENTS_REJECTED:
            return state;
        default:
            return state;
    }
};

const rating = (state = {recipeid: 0, comment: '', stars: '0'}, action) => {
    switch (action.type) {
        case types.SET_RATING_STARS:
            return action.rating;
        case types.SEND_RATING:
            return state;
        case types.SEND_RATING_SUCCESS:
            return state;
        case types.SEND_RATING_REJECTED:
            return state;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    filter,
    categoryFilter,
    recipes,
    ingredients,
    categories,
    modal,
    rating,
    routing
});

export default rootReducer;
