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
        const savedCategories = Storage().getAllCategories();

        const isExisted = savedCategories.find((c) => c.id === categoryToSave.id);
        if (isExisted){

        }else {
            
        }
    
    }
    



}