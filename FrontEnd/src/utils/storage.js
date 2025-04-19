export const storage={
    get (key){
        const data=localStorage.getItem(key)
        if(!data){
            return null
        }try {
            return JSON.parse(data)            
        } catch (error) {
            return null
        }
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