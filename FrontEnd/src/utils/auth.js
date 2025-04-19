import axios from 'axios'

export const login = async (email, password)=>{
    try {
        const res=await axios.post('http://localhost:3015/users/login',{email, password}, {withCredentials:true}
        )
    
    if(res.status===200){
        localStorage.setItem('authUser',JSON.stringify(res.data.data))
        localStorage.setItem('authToken',res.data.token)
        return res.data
    }else{
        throw new Error('Contraseña y/o usuario incorrecto')
    }
    } catch (error) {
        throw error
    }    
    
}

export const logout = async ()=>{
    try {
        await axios.get('http://localhost:3015/users/logout' , {withCredentials:true}
        )
        localStorage.removeItem('authUser')
        localStorage.removeItem('authToken')
    } catch (error) {
        throw error
    }
    
}