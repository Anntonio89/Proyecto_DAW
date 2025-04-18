export const storage={
    get (key){
        const data=localStorage.getItem(key)
        if(!data){
            return null
        }
        return JSON.parse(data)
    },
    set(key,data){
        localStorage.setItem(key,JSON.stringify(data))
    },
    remove(key){
       localStorage.removeItem(key)
    },
    clear(){
        localStorage.clear()
    }
}

export default storage