
import Storage from "./Storage.js";

const productTitle = document.getElementById('product-title');
const productQuantity = document.getElementById('product-quantity');
const addNewProductBtn = document.querySelector('.add-new-product-btn');
const productCategory = document.getElementById('category-product');
const productsList = document.getElementById('products-list');

class ProductView{
    constructor(){
        addNewProductBtn.addEventListener('click' , (e) => this.addNewProduct(e))
        this.products =[];
    }
    setApp(){
        this.products = Storage.getAllProducts();
    }
    addNewProduct(e){
        e.preventDefault();
        const title = productTitle.value ;
        const quantity = productQuantity.value ;
        const category = productCategory.value ;
        if (!title || !quantity || !category) return ;

        Storage.saveProduct({title ,quantity , category});
        this.products = Storage.getAllProducts();
        productTitle.value='';
        productQuantity.value='';
        productCategory.value='';
        this.setApp();
        this.createProductList();
    }
    createProductList(){
        const productsDom = document.querySelector('.products-list');
        let result = '';
        this.products.forEach(item => {
            const selectedCategory = Storage.getAllCategories().find(c=> c.id === parseInt(item.category))
            result +=`<div class="products">
            <div class="product">${item.title}</div>
            <div class="product-option">
            <div class="product-date">${new Date(item.updated).toLocaleString('fa-IR' , {dateStyle: 'short'})}</div>
            <div class="quantity">${item.quantity}</div>
                <div class="product-cat">${selectedCategory.title}</div>
                <button class="edit-product btn" data-id='${item.id}'>Edit</button>
                <button class="delete-product btn" data-id='${item.id}'>Delete</button>
            </div>
        </div>`;
        })
        productsDom.innerHTML = result;
    }
}

export default new ProductView();