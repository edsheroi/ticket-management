'use client'
import { React, use } from 'react'
import { useState, useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'


function postEdit({ params }) {
    const { id } = use(params)
    const router = useRouter()

    const [error, setError] = useState('')
    const [name , setName] = useState('')
    const [lastName , setLastName] = useState('')
    const [detail, setDetail] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [postData, setPostData] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const res = await fetch(`http://localhost:3000/api/created/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    detail, contact, email, address , name , lastName
                })
            })

            if (!res.ok) {
                throw new Error('Failed to PUT data')
            } else {
                router.push('/inprocess')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function getPostData(id) {
        try {
            const res = await fetch(`http://localhost:3000/api/created/${id}`, {
                method: 'GET',
                cache: 'no-store'
            })

            if (!res.ok) {
                throw new Error('Failed to get data post!')
            }

            const data = await res.json()
            setPostData(data.postData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPostData(id)
    }, [])

    useEffect(() => {
        if (postData) {
            setName(postData.name || '')
            setLastName(postData.lastName || '')
            setDetail(postData.detail || '')
            setContact(postData.contact || '')
            setEmail(postData.email || '')
            setAddress(postData.address || '')
        }
    }, [postData])

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-200'>
            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
                {error && (
                    <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                )}

                <div className="flex flex-col">
                    <input type="text" placeholder={postData.name} value={name} className="input input-xl my-2" onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder={postData.lastName} value={lastName} className="input input-xl my-2" onChange={(e) => setLastName(e.target.value)} />
                    <input type="text" placeholder={postData.detail} value={detail} className="input input-xl my-2" onChange={(e) => setDetail(e.target.value)} />
                    <input type="text" placeholder={postData.email} value={email} className="input input-xl my-2" onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder={postData.contact} value={contact} className="input input-xl my-2" onChange={(e) => setContact(e.target.value)} />
                    <input type="text" placeholder={postData.address} value={address} className="input input-xl my-2" onChange={(e) => setAddress(e.target.value)} />
                    <button className='btn btn-md mt-4 bg-green-500 hover:bg-green-600 text-white'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default postEdit