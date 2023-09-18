import ky from 'ky'
const api = ky.create({prefixUrl: process.env.VUE_APP_BASE_URL, retry: {limit: 2}})
const api2 = ky.create({prefixUrl: process.env.VUE_APP_BASE_URL2})

console.log(process.env.VUE_APP_BASE_URL);
export function getUserList(remarks){
    return api2.get('info',{
        searchParams:{
            remarks:remarks
        }
    }).json()
}
export function addUser(cookie){
    return api2.post('add',{json:cookie},
       ).json()
}

export function updateUser(body){
    return api2.post('update',{json:body}).json()
}

export function watering(cookie){
    return api.post('watering',{json:cookie},
    ).json()
}
export function pause(){
    return api.get('pause').json();
}