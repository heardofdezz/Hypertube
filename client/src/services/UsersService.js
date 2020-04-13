import Api from '@/services/Api'

export default {
    register (informations) {
        return Api().post('register', informations)
    },
    login (informations) {
        return Api().post('login', informations)
    }
}

