import * as types from './types';
import jQuery from 'jquery';
import axios from 'axios';
import * as constants from './constants';

export function filterTable(filter, categoryFilter) {
    return {
        type: types.FILTER,
        filter,
        categoryFilter
    };
}

export function fetchRecipes() {
    const actionType = types.FETCH_RECIPES;
    return dispatch => {
        dispatch({type: `${actionType}_PENDING`});
        axios.get(constants.API_URL + 'recipes').then(resp => {
            dispatch({
                type: `${actionType}_FULFILLED`,
                payload: resp.data.data
            });
        }).catch(err => {
            dispatch({
                type: `${actionType}_REJECTED`,
                error: err
            });
        });
    };
}

export function addEditRecipe(recipe) {
    if(recipe.id === 0) {
        return dispatch => {
            dispatch({type: types.ADD_RECIPE});
            axios.post(constants.API_URL + 'recipes', recipe).then(resp => {
                dispatch({
                    type: types.ADD_RECIPE_SUCCESS,
                    payload: resp
                });
                dispatch(fetchRecipes());
            }).catch(err => {
                dispatch({
                    type: types.ADD_RECIPE_REJECTED,
                    error: err
                });
            });
        };
    }
    return dispatch => {
        if(recipe.ingredients) {
            recipe.ingredients = recipe.ingredients.filter(function iterate(ingredient) {
                return ingredient.recipeid === 0;
            });
        }
        dispatch({type: types.EDIT_RECIPE});
        axios.put(constants.API_URL + 'recipes/' + recipe.id, recipe).then(resp => {
            dispatch({
                type: types.EDIT_RECIPE_SUCCESS,
                payload: resp
            });
            dispatch(fetchRecipes());
        }).catch(err => {
            dispatch({
                type: types.EDIT_RECIPE_REJECTED,
                error: err
            });
        });
    };
}

export function removeRecipe(recipe) {
    return dispatch => {
        dispatch({type: types.REMOVE_RECIPE});
        axios.delete(constants.API_URL + 'recipes/' + recipe.id).then(resp => {
            dispatch({
                type: types.REMOVE_RECIPE_SUCCESS,
                payload: resp
            });
            dispatch(fetchRecipes());
        }).catch(err => {
            dispatch({
                type: types.REMOVE_RECIPE_REJECTED,
                error: err
            });
        });
    };
}
export function updateHotRecipe(recipes, recipe) {
    const existingRecipeIndex = recipes.findIndex(function iterate(obj) {
        return obj.id === recipe.id;
    });
    if(existingRecipeIndex >= 0) {
        recipes[existingRecipeIndex] = recipe;
    }
    return {
        type: types.UPDATE_HOT_RECIPE,
        recipes
    };
}

export function addIngredient(ingredients, ingredient) {
    if(ingredients.length > 0) {
        ingredient.id = parseInt(ingredients[ingredients.length - 1].id, 10) + 1;
    }else{
        ingredient.id = 2;
    }
    ingredient.hot = true;
    ingredients.push(ingredient);
    return {
        type: types.ADD_INGREDIENT,
        ingredients
    };
}

export function removeIngredient(ingredients, ingredient) {
    if(ingredient.hot) {
        return {
            type: types.REMOVE_HOT_INGREDIENT,
            ingredients
        };
    }
    return dispatch => {
        dispatch({type: types.REMOVE_INGREDIENT});
        axios.delete(constants.API_URL + 'ingredients/' + ingredient.id).then(resp => {
            dispatch({
                type: types.REMOVE_INGREDIENT_SUCCESS,
                payload: resp
            });
            if(ingredient.recipeid) {
                dispatch(fetchIngredients(ingredient.recipeid));
            }
        }).catch(err => {
            dispatch({
                type: types.REMOVE_INGREDIENT_REJECTED,
                error: err
            });
        });
    };
}

export function fetchIngredients(recipeid) {
    const actionType = types.FETCH_INGREDIENTS;
    return dispatch => {
        dispatch({type: `${actionType}_PENDING`});
        axios.get(constants.API_URL + 'ingredients/' + recipeid ).then(resp => {
            dispatch({
                type: `${actionType}_FULFILLED`,
                payload: resp.data.data
            });
        }).catch(err => {
            dispatch({
                type: `${actionType}_REJECTED`,
                error: err
            });
        });
    };
}

export function fetchCategories() {
    const actionType = types.FETCH_CATEGORIES;
    return dispatch => {
        dispatch({type: `${actionType}_PENDING`});
        axios.get(constants.API_URL + 'categories').then(resp => {
            dispatch({
                type: `${actionType}_FULFILLED`,
                payload: resp.data.data
            });
        }).catch(err => {
            dispatch({
                type: `${actionType}_REJECTED`,
                error: err
            });
        });
    };
}

export function openModal(id, attachedObject) {
    jQuery('#' + id).openModal({dismissible: false});
    return dispatch => {
        dispatch({
            type: types.FETCH_INGREDIENTS,
            ingredients: attachedObject.ingredients
        });
        dispatch({
            type: types.OPEN_MODAL,
            id,
            attachedObject
        });
    };
}

export function closeModal(id, attachedObject) {
    Object.keys(attachedObject).forEach(function iterate(key) {
        if(attachedObject[key].constructor === Array) {
            attachedObject[key] = [];
        }else {
            attachedObject[key] = '';
        }
    });
    const modal = jQuery('#' + id);
    modal.find('input:text, input:password, select, textarea').val('');
    modal.closeModal();

    return {
        type: types.CLOSE_MODAL,
        id,
        attachedObject
    };
}

export function formChange(object, property, value) {
    object[property] = value;
    return {
        type: types.FORM_CHANGE,
        object
    };
}

export function setRatingStars(rating, stars) {
    rating.stars = stars;
    return {
        type: types.SET_RATING_STARS,
        rating
    };
}

export function sendRating(rating) {
    return dispatch => {
        dispatch({type: types.SEND_RATING});
        axios.post(constants.API_URL + 'ratings', rating).then(resp => {
            dispatch({
                type: types.SEND_RATING_SUCCESS,
                payload: resp
            });
            dispatch(fetchRecipes());
        }).catch(err => {
            dispatch({
                type: types.SEND_RATING_REJECTED,
                error: err
            });
        });
    };
}
