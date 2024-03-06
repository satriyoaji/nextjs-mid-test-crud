'use client'
import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const EditPage = ({params} :{params:{id:number}}) => {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const { data: user, error, isLoading } = useSWR<any>(`/api/users/`+params.id, fetcher);
    useEffect(()=>{
        if(user){
            setEmail(user.email);
            setName(user.name);
        }
    },[user])
    const saveData = (e)=>{
        e.preventDefault();
        if(email!="" && name !=""){
            var data = {
                "email":email,
                "name":name
            }
            console.log(data);
            fetch(`/api/users/`+params.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.success>0){
                    alert(data.message);
                    router.push('/user')
                }
            })
              .catch((err) => {
                  alert(err);
              })
        }

    }
    if(error) return <div>failed to load</div>
    if(isLoading) return <div>loading...</div>
    return <div className="w-full max-w-5xl m-auto mt-4">
        <h1 className="text-3xl font-bold">Edit</h1>
        <form className={'mt-4'} onSubmit={saveData}>
            <input placeholder={'email@domain.com'} type="email" name="email" id="email" className="border border-slate-300 p-1 m-1" value={email} onChange={e => setEmail(e.target.value)}/>
            <input placeholder={'Name'} type="text" name="name" id="name" className="border border-slate-300 p-1 m-1" value={name} onChange={e => setName(e.target.value)}/>
            <input type="submit" value="submit" className="border border-slate-300 p-1 m-1" />
        </form>
    </div>
}
export default EditPage
