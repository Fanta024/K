import ky from 'ky'
const api = ky.create({prefixUrl: process.env.VUE_APP_BASE_URL, retry: {limit: 0}})
console.log(process.env.VUE_APP_BASE_URL);
export function getUserList(remarks){
    return api.get('info',{
        searchParams:{
            remarks:remarks
        }
    }).json()
}
export function addUser(cookie){
    return api.post('add',{json:cookie},
       ).json()
}

export function updateUser(body){
    return api.post('update',{json:body}).json()
}

export function watering(cookie){
    return api.post('watering',{json:cookie},
    ).json()
}
export function pause(){
    return api.get('pause').json();
}