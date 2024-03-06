'use client'
import React from 'react'
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const ReadPage = ({params} :{params:{id:number}}) => {
    const { data: user, error, isLoading } = useSWR<any>(`/api/users/`+params.id, fetcher);
    if(error) return <div>failed to load</div>
    if(isLoading) return <div>loading...</div>
    return <div className="w-full max-w-5xl m-auto">
        <h1 className="text-3xl font-bold">Read User</h1>
        <p className="text-2xl">{user?.email}</p>
        <p className="text-2xl">{user?.name}</p>
    </div>
}
export default ReadPage
