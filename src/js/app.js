
import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener('DOMContentLoaded' , () =>{
    CategoryView.setApp();
    CategoryView.createCategoryList();
    ProductView.setApp();
    ProductView.createProductList(ProductView.products);
})