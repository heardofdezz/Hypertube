import Api from '@/services/Api'

export default {
 
    MoviesIndex(){
        return Api().get('research')
    },
    Categories(){
        return Api().get('categories')
    },
}

