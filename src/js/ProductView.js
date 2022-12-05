
import Storage from "./Storage.js";

const productTitle = document.getElementById('product-title');
const productQuantity = document.getElementById('product-quantity');
const addNewProductBtn = document.querySelector('.add-new-product-btn');
const productCategory = document.getElementById('category-product');
const searchInput = document.querySelector('#search-product');
const selectedSort = document.querySelector('#sort-products');
const modalProduct = document.querySelector('.modal-products');
const backDrop = document.querySelector('.backdrop');
const totalProductsNumber = document.querySelector('.total-products');


class ProductView{
    constructor(){
        addNewProductBtn.addEventListener('click' , (e) => this.addNewProduct(e))
        searchInput.addEventListener('input' , (e) => this.searchProducts(e));
        selectedSort.addEventListener('change' , (e) => this.sortProducts(e)) ;
        
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
        this.createProductList(this.products);
    }
    createProductList(products){
        const productsDom = document.querySelector('.products-list');
        let result = '';
        products.forEach(item => {
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

    let totalProducts = 0;
    products.forEach(item =>{
        totalProducts += parseInt(item.quantity);
    })
    // console.log(totalProducts);
    totalProductsNumber.innerText = totalProducts;
    if (totalProducts<1){
        totalProductsNumber.style.visibility="hidden";
    }else{
        totalProductsNumber.style.visibility="visible";
    }


    productsDom.innerHTML = result;
    const deleteProdctBtns =[... document.querySelectorAll('.delete-product')]
    deleteProdctBtns.forEach( item => {
        item.addEventListener('click' ,(e) => this.deleteProduct(e))
    })
    const editProductBtns =[... document.querySelectorAll('.edit-product')]
    editProductBtns.forEach(item =>{
        item.addEventListener('click' , e => this.editProduct(e))
    })
    }
    searchProducts(e){
        const value = e.target.value.trim().toLowerCase();
        const filteredProducts = this.products.filter( p =>{
            return p.title.toLowerCase().includes(value);
        })

        this.createProductList(filteredProducts)
    }
    sortProducts(e){
        const value = e.target.value ;
        this.products = Storage.getAllProducts(value);
        this.createProductList(this.products);
    }
    deleteProduct(e){
        e.preventDefault();
        const productId =e.target.dataset.id;
        Storage.deleteProduct(productId);
        this.setApp();
        this.createProductList(this.products);
    }
    editProduct(e){
        e.preventDefault();
        const productId =e.target.dataset.id;
        backDrop.style.display = "block" ;
        modalProduct.style.visibility= "visible";
        console.log(productTitle.value);

        const categories= Storage.getAllCategories();       
        let option =`<option class="category-product-option" value="">Select a category</option>` 
        categories.forEach(element => {
           option +=`<option class="category-product-option" value="${element.id}">${element.title}</option>`;
        });

        const selectedProduct = Storage.getAllProducts().find( c => parseInt(c.id) === parseInt(productId));
        const div = document.createElement('div');
        div.className ="modal-product";
        let result=`<label class="label" for="product-title-edit">Edit Product Title</label>
        <input  type="text" placeholder="product title" class="product-title-edit" value=${selectedProduct.title} id="product-title-edit" />
        <label class="label" for="product-quantity-edit" >Edit Quantity</label>
        <input type="number" placeholder="0" max="100" min="1" value=${selectedProduct.quantity} id="product-quantity-edit" />
        <label class="label" for="category-product-edit">Edit Category</label>
        <select id="category-product-edit" value=>${option}</select>
        <div class="btns">
            <button class="cancel-edit-product-btn btn">Cancel</button>
            <button class="add-new-product-btn btn">Edit Product</button>
        </div>`;
        div.innerHTML=result;
        modalProduct.appendChild(div)



        const cancelModalBtn = [...document.querySelectorAll('.cancel-edit-product-btn')];
        cancelModalBtn.forEach( item =>{
            item.addEventListener('click' , e => {
        e.preventDefault();
        backDrop.style.display = "none" ;
        modalProduct.style.visibility= "hidden";
        modalProduct.removeChild(div);
            })
        })
    }

}

export default new ProductView();