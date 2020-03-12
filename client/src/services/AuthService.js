import Api from '@/services/Api'

export default {
    signup (informations) {
        return Api().post('register', informations)
    },
    login (informations) {
        return Api().post('login', informations)
    }
}

