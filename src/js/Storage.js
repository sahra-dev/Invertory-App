const products = [
    {
        id: 1,
        title : ' har ',
        category : 'harchi',
        updated : "2022-12-03T12:16:00.513Z" ,
    },
    {
        id: 2,
        title : 'hich',
        category : 'hichi' ,
        updated : "2022-11-03T12:17:00.513Z" ,
    }
]

const categries =[
    {
        id : 1 ,
        title : 'harchi' ,
        description : ' harchi harchi ',
        createdAt :"2022-12-03T12:17:00.513Z",
    },
    {
        id: 2 ,
        title : 'hichi',
        description : 'hichi  hichi',
        createdAt :"2022-11-03T12:17:00.513Z"
    },
];

export default class Storage{

    static getAllCategories(){

        const savedCategories = JSON.parse(localStorage.getItem('category')) || [];
        const sortedCategories = savedCategories.sort((a,b) =>{
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });
        return sortedCategories;
    };
    static saveCategory(categoryToSave){
        const savedCategories = Storage.getAllCategories();

        const isExisted = savedCategories.find((c) => c.id === parseInt(categoryToSave.id));
        if (isExisted){
            isExisted.title = categoryToSave.title;
            isExisted.description = categoryToSave.description ;
        }else {
            categoryToSave.id =  new Date().getTime();
            categoryToSave.createdAt = new Date().toISOString() ;
            savedCategories.push(categoryToSave);
        }
    localStorage.setItem('category' , JSON.stringify(savedCategories));
    }
    static getAllProducts(sort = 'newest'){

        const savedProducts = JSON.parse(localStorage.getItem('product')) || [];
        return savedProducts.sort((a,b) =>{
            if (sort === 'newest'){
                return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
            }else if (sort ==='oldest'){
                return new Date(a.updated) > new Date(b.updated) ? 1 : -1;
            }
        });
        
    };
    static saveProduct(productToSave){
        const savedProducts = Storage.getAllProducts();

        const isExisted = savedProducts.find((c) => c.id === parseInt(productToSave.id));
        if (isExisted){
            isExisted.title = productToSave.title;
            isExisted.category = productToSave.category ;
            isExisted.quantity = productToSave.quantity ;
            isExisted.updated = new Date().toISOString();
        }else {
            productToSave.id =  new Date().getTime();
            productToSave.updated = new Date().toISOString() ;
            savedProducts.push(productToSave);
        }
    localStorage.setItem('product' , JSON.stringify(savedProducts));
    }
    static deleteProduct(id){
        const savedProduct = Storage.getAllProducts();
        const filteredProducts = savedProduct.filter( p => parseInt(p.id) !== parseInt(id) );
        localStorage.setItem("product" , JSON.stringify(filteredProducts));
    }


}