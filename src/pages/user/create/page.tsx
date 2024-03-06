'use client'
import React,{ useState} from 'react'
import { useRouter } from 'next/navigation'
const CreatePage = ({params} :{params:{id:number}}) => {
    const route = useRouter()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const saveData = (e : any)=>{
        e.preventDefault();
        if(name!="" && email !=""){
            var data = {
                "name":name,
                "email":email,
                "address":address,
            }
            fetch(`/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.success>0){
                    alert(data.message);
                    route.push('/user')
                }
            })
              .catch((err) => {
                  alert(err);
              })
        }
    }

    return <div className="w-full max-w-5xl m-auto mt-4">
        <h1 className="text-3xl font-bold">Create</h1>
        <form className={'mt-4'} onSubmit={saveData}>
            <input placeholder={'email@domain.com'} type="email" name="email" id="email" className="border border-slate-300 p-1 m-1"  onChange={e => setEmail(e.target.value)}/>
            <input placeholder={'Name'} type="text" name="name" id="name" className="border border-slate-300 p-1 m-1"  onChange={e => setName(e.target.value)}/>
            <textarea placeholder={'Address'} name="address" id="address" className="border border-slate-300 p-1 m-1"  onChange={e => setAddress(e.target.value)}/>
            <input type="submit" value="submit" className="border border-slate-300 p-1 m-1" />
        </form>
    </div>
}
export default CreatePage
