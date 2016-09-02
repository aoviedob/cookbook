import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RecipesTable from '../components/RecipesTable';
import DropDown from '../components/DropDown';
import Modal from '../components/Modal';
import AddEditRecipeForm from '../components/AddEditRecipeForm';
import { filterTable, addEditRecipe, removeRecipe, openModal, closeModal, formChange } from '../../actions';
import jQuery from 'jquery';

const RecipeManagement = ({ recipes, categories, filter, categoryFilter, onFilter, onRecipeAddEdit, onRecipeRemove, modal, onOpenModal, onCloseModal, onFormChange}) => {
    let search = {value: ''};
    let dropDownCategory = jQuery.extend({}, categoryFilter);
    const formRecipe = jQuery.extend({}, modal);
    const formCategories = categories.slice(0);
    formCategories.unshift({id: 0, name: 'ALL'});
    formRecipe.modalTitle = 'Add a Recipe';
    const modalId = 'addEditRecipeModal';

    return (
        <div className="filterable-table">
            <h4 className="grey-text">Recipe Management</h4>
            <div className="row valign-wrapper">
                <div className="col s6 m9 l9">
                    <input className="filter-input" value={filter} placeholder="Search an existing recipe"  ref={node => {search = node;}}
                        onChange={() => onFilter(search.value, categoryFilter)} />
                </div>
                <div className="col s6 m3 l3">
                    <DropDown id="categoryDropDown" className="dropdown-content white grey-text" state={dropDownCategory} options={formCategories}
                        labelField="name" valueField="id" onChange={() => onFilter(search.value, dropDownCategory)}/>
                </div>
                <div className="col s2 m1 l1 center-align">
                    <a className="btn-floating btn-large waves-effect waves-light blue" onClick={() => onOpenModal(modalId, modal)}><i className="material-icons">add</i></a>
                </div>
            </div>
            <Modal id={modalId} modalType="modal">
                <AddEditRecipeForm modalId={modalId} recipes={recipes} recipe={formRecipe} categories={categories} onFormChange={onFormChange} onRecipeAddEdit={onRecipeAddEdit} onCloseModal={onCloseModal}/>
            </Modal>
            <RecipesTable editModalId={modalId} recipes={recipes} recipe={formRecipe} filter={filter} categoryFilter={categoryFilter} onRecipeRemove={onRecipeRemove} onCloseModal={onCloseModal}/>
        </div>
    );
};

RecipeManagement.propTypes = {
    recipes: PropTypes.array,
    categories: PropTypes.array,
    filter: PropTypes.string,
    categoryFilter: PropTypes.object,
    onFilter: PropTypes.func,
    onRecipeAddEdit: PropTypes.func,
    onRecipeRemove: PropTypes.func,
    onOpenModal: PropTypes.func,
    modal: PropTypes.object,
    onCloseModal: PropTypes.func,
    onFormChange: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
        categoryFilter: state.categoryFilter,
        recipes: state.recipes,
        categories: state.categories,
        modal: state.modal
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: (filterText, categoryFilter) => dispatch(filterTable(filterText, categoryFilter)),
        onRecipeAddEdit: (recipe) => dispatch(addEditRecipe(recipe)),
        onRecipeRemove: (recipe) => dispatch(removeRecipe(recipe)),
        onOpenModal: (modalId, object) => dispatch(openModal(modalId, object)),
        onCloseModal: (modalId, object) => dispatch(closeModal(modalId, object)),
        onFormChange: (object, property, value) => dispatch(formChange(object, property, value))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipeManagement);
