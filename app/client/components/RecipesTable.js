import React, { PropTypes } from 'react';
import RecipeRow from './RecipeRow';
import Modal from './Modal';
import RemoveRecipe from './RemoveRecipe';
import RecipeInfo from './RecipeInfo';
import { openModal } from '../../actions';
import { connect } from 'react-redux';

const RecipesTable = ({recipes, recipe, filter, categoryFilter, modal, onOpenModal, onRecipeRemove, editModalId, onCloseModal }) => {
    const removeModalId = 'removeRecipeModal';
    const infoModalId = 'recipeInfoModal';
    const openRemoveModal = (recipeToRemove) =>{
        onOpenModal(removeModalId, recipeToRemove);
    };
    const openEditModal = (recipeToEdit) =>{
        recipeToEdit.modalTitle = 'Edit a Recipe';
        onOpenModal(editModalId, recipeToEdit);
    };
    const openInfoModal = (recipeInfo) =>{
        onOpenModal(infoModalId, recipeInfo);
    };

    let rows = [];
    recipes.forEach((p) => {
        const formattedName = p.name.toLowerCase();
        const formattedFilter = filter.toLowerCase();
        if(formattedName.indexOf(formattedFilter) !== -1  || formattedFilter.trim() === '') {
            if(categoryFilter.id === 0 || categoryFilter.id === p.category) {
                rows.push(
                    <RecipeRow key={p.id} data={p} onOpenRemoveModal={openRemoveModal} onOpenEditModal={openEditModal} onOpenInfoModal={openInfoModal}/>
                );
            }
        }
    });

    return (<div>
              <div className="row"><ul className="collection"> {rows} </ul></div>
              <Modal id={removeModalId} modalType="modal">
                <RemoveRecipe onRecipeRemove={() => onRecipeRemove(modal)}/>
              </Modal>
              <Modal id={infoModalId} modalType="modal bottom-sheet bottom-sheet-large">
                <RecipeInfo recipe={recipe} modalId={infoModalId} onCloseModal={onCloseModal}/>
              </Modal>
            </div>);
};

RecipesTable.propTypes = {
    recipes: PropTypes.array,
    filter: PropTypes.string,
    categoryFilter: PropTypes.object,
    modal: PropTypes.object,
    onOpenModal: PropTypes.func,
    onRecipeRemove: PropTypes.func,
    editModalId: PropTypes.string,
    recipe: PropTypes.object,
    onCloseModal: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        modal: state.modal
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOpenModal: (modalId, object) => dispatch(openModal(modalId, object)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipesTable);
