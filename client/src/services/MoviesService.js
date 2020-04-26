import Api from '@/services/Api'

export default {
 
    MoviesIndex(){
        return Api().get('movies')
    },
    Categories(){
        return Api().get('categories')
    },
}

