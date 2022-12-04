
import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener('DOMContentLoaded' , () =>{
    CategoryView.setApp();
    console.log(CategoryView)
    CategoryView.createCategoryList();
    ProductView.setApp();
    console.log(ProductView);
    ProductView.createProductList(ProductView.products);
})