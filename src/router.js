import Vue from 'vue';
import Router from 'vue-router';
import firebase from "firebase";
import record from "@/store/record";

Vue.use(Router);


const router = new Router({
    mode:'history',
    base:process.env.BASE_URL,
    routes:[
        {
            path:'/login',
            name:'login',
            meta:{layout:'empty'},
            component:()=> import('./views/Login.vue')
        },
        {
            path:'/register',
            name:'register',
            meta:{layout:'empty'},
            component:()=> import('./views/Register.vue')
        },
        {
            path:'/',
            name:'home',
            meta:{layout:'main', auth:true},
            component:()=>import('./views/Home'),
        },
        {
            path:'/categories',
            name:'categories',
            meta:{layout:'main', auth:true},
            component:()=> import('./views/Categories')
        },
        {
            path:'/detail/:id',
            name:'detail',
            meta:{layout:'main', auth:true},
            component:()=> import('./views/Detail.vue')
        },
        {
            path:'/planning',
            name:'planning',
            meta:{layout:'main', auth:true},
            component:()=>import('./views/Planning.vue')
        },
        {
            path:'/profile',
            name:'profile',
            meta:{layout:'main', auth:true},
            component:()=> import('./views/Profile')
        },
        {
            path:'/record',
            name:'record',
            meta:{layout:'main', auth:true},
            component:()=> import('./views/Record')
        },
        {
            path:'/history',
            name:'history',
            meta:{layout:'main', auth:true},
            component:()=> import('./views/History')
        },


    ]
});

router.beforeEach((to,from,next)=>{
    const currentUser = firebase.auth().currentUser;
    const requiredAuth = to.matched.some(record=>record.meta.auth);

    console.log(requiredAuth)
    console.log(currentUser)
    if(requiredAuth && !currentUser){
        next('/login?message=login')
    }
    else{
        next();
    }


})

export default router;