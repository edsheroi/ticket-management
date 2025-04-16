'use client'

import React from 'react'
import { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'

function Register() {

    const router = useRouter()

    const [name , setName] = useState('')
    const [lastName , setLastName] = useState('')
    const [detail, setDetail] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            if (!detail || !contact || !email || !address || !name || !lastName) {
                setError('Please complete all input')
                return
            }

            const res = await fetch(`http://localhost:3000/api/created`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    detail, contact, email, address, name , lastName
                })
            })

            if (!res.ok) {
                throw new Error('Failed to create a post')
            } else {
                router.push('/inprocess')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-200'>
            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
                {error && (
                    <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mb-2'>
                        {error}
                    </div>
                )}
                <div className='flex flex-col'>
                    <input type="text" placeholder="Name" className="input input-xl my-2" onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="Last Name" className="input input-xl my-2" onChange={(e) => setLastName(e.target.value)} />
                    <input type="text" placeholder="Detail" className="input input-xl my-2" onChange={(e) => setDetail(e.target.value)} />
                    <input type="email" placeholder="Email" className="input input-xl my-2" onChange={(e) => setContact(e.target.value)} />
                    <input type="text" placeholder="Contact" className="input input-xl my-2" onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder="Address" className="input input-xl my-2" onChange={(e) => setAddress(e.target.value)} />
                    <button className='btn btn-md mt-4 bg-green-500 hover:bg-green-600 text-white'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register