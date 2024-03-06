'use client'
import React from 'react'
import useSWR from "swr";
import { useRouter } from 'next/navigation'
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const ReadPage = ({params} :{params:{id:number}}) => {
    const router = useRouter();
    const { data: user, error, isLoading } = useSWR<any>(`/api/users/`+params.id, fetcher);
    const deleteUser = (id)=>{
        fetch(`/api/users/`+id, {
            method: 'DELETE',
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
    if(error) return <div>failed to load</div>
    if(isLoading) return <div>loading...</div>

    return <div className="w-full max-w-5xl m-auto">
        <h1 className="text-3xl font-bold">Read User</h1>
        <p className="text-2xl">{user?.name}</p>
        <p className="text-2xl">{user?.email}</p>
        <button className="bg-red-500 font-bold p-1 inline-block rounded-md text-white" onClick={()=>deleteUser(params.id)}>Remove User</button>
    </div>
}
export default ReadPage
