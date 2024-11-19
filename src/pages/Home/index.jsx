import { useEffect, useRef, useState } from 'react'
import Trash from '../../assets/trash.png'
import api from '../../services/api'
import './style.css'


function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers(){
    const usersFromApi = await api.get('https://users-ebon-nine.vercel.app/usuarios')

    setUsers(usersFromApi.data)
  } 

  async function createUsers(){
    await api.post('https://users-ebon-nine.vercel.app/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
 
    getUsers()

  } 

  async function deleteUsers(id){
    await api.delete(`https://users-ebon-nine.vercel.app/usuarios/${id}`)

    getUsers()
  } 

  useEffect(() => {
    getUsers()
  }, [])

  return (
      <div className='container'>
          <form>
            <h1>Cadastro de Usuários</h1>
            <input name='nome' type='text' placeholder='Insira seu nome' ref={inputName}/>
            <input name='idade' type='number' placeholder='Insira sua idade' ref={inputAge}/>
            <input name='email' type='email' placeholder='Insira seu email' ref={inputEmail}/>
            <button type='button' onClick={createUsers}>Cadastrar</button>
          </form>

          {users.map(user => (
             <div key={user.id} className='card'>
             <div>
               <p>Nome: <span>{user.name}</span></p>
               <p>Idade: <span>{user.age}</span></p>
               <p>Email: <span>{user.email}</span></p>
             </div>
             <button onClick={() => deleteUsers(user.id)}>
               <img src={Trash}/>
             </button>
           </div>
          ))}

         
      </div>
  )
}

export default Home
