import axios from 'axios'

export const login = async (email, password)=>{
    const res=await axios.post('http://localhost:3015/users/login',{email, password}, {withCredentials:true})
    localStorage.setItem('user',JSON.stringify(res.data.data))
    localStorage.setItem('token',res.data.token)
    return res.data
}

export const logout =(navigate)=>{
    axios.post('http://localhost:3015/users/logout',{}, {withCredentials:true})
    localStorage.removeItem('user')
    localStorage.removeItem('token')
}