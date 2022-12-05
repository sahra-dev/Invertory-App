
import Storage from "./Storage.js";

const categoryTitle = document.getElementById('category-title');
const categoryDesc  = document.getElementById('category-desc');
const addNewCategoryBtn = document.querySelector('.add-new-category-btn');
const toggleCategoryBtn = document.querySelector('#toggle-add-category');
const categorySection = document.querySelector('.category-section');
const cancelCategoryBtn = document.querySelector('.cancel-category-btn')

class CategoryView{
    constructor(){
        addNewCategoryBtn.addEventListener('click' ,e => this.addNewCategory(e))
        toggleCategoryBtn.addEventListener('click' , (e) => this.toggleAddCategory(e))
        cancelCategoryBtn.addEventListener('click' , (e)=> this.cancelCategory(e))
        this.categories = [];
          
    }
    
    addNewCategory(e){
        e.preventDefault();
        const title = categoryTitle.value;
        const description = categoryDesc.value;
        if (!title || !description ) return;
        Storage.saveCategory({title , description});
        this.categories = Storage.getAllCategories();
        categoryTitle.value ='';
        categoryDesc.value='';
        this.setApp();
    }
    setApp(){
        this.categories = Storage.getAllCategories();
        this.createCategoryList();
    }
    createCategoryList(){

        let result=`<option class="category-product-option" value="">select a category</option>`;
        
        this.categories.forEach(element => {
            result+=`<option class="category-product-option" value="${element.id}">${element.title}</option>`;
        });
        const productCategory = document.querySelector('#category-product');
        productCategory.innerHTML = result;

    }
    toggleAddCategory(e){
        e.preventDefault();
        toggleCategoryBtn.style.display ="none";
        categorySection.style.display = "block";
    }
    cancelCategory(e){
        e.preventDefault();
        toggleCategoryBtn.style.display ="block";
        categorySection.style.display = "none";
        categoryTitle.value="";
        categoryDesc.value="";
    }

}
export default new CategoryView();