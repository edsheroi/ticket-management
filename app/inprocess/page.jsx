'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import Image from 'next/image'
import $ from 'jquery'

function Inporcess() {
    const router = useRouter()
    const [postData, setPostData] = useState([])

    async function getPostData() {
        try {
            const res = await fetch(`http://localhost:3000/api/created`, {
                method: "GET",
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

    async function handleDelete(id) {
        try {
            const res = await fetch(`http://localhost:3000/api/created/${id}`, {
                method: 'DELETE',
                cache: 'no-store'
            })

            if (!res.ok) {
                throw new Error('Failed to delete post!')
            }

            setPostData(prev => prev.filter(item => item._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSubmit(id , type) {
        try {
            const res = await fetch(`http://localhost:3000/api/created/${id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type
                })
            })

            if (!res.ok) {
                throw new Error('Failed to accepted post!')
            }

            router.push('/history')

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPostData();
    }, [])

    postData.forEach((ele,i) => {
        if (ele.status == 'resolved') {
            $(`#_status_${i}`).addClass('text-yellow-500');
        }
    })
    

    console.log(postData)

    return (
        <div className=' overflow-x-auto bg-gray-200 h-screen'>
            <div className="overflow-x-auto mx-5 my-6 px-5 py-4 bg-white shadow-lg rounded-xl">
                <table className="min-w-full table-auto border border-gray-200">
                    <thead className="bg-gray-100 text-gray-700 text-md font-semibold">
                        <tr>
                            <th className="py-3 px-6 text-left">#</th>
                            <th className="py-3 px-6 text-left">Action</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Last Name</th>
                            <th className="py-3 px-6 text-left">Detail</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Contact</th>
                            <th className="py-3 px-6 text-left">Address</th>
                            <th className="py-3 px-6 text-left">Created At</th>
                            <th className="py-3 px-6 text-left">Updated At</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800 text-[15px]">
                        {postData && postData.length > 0 ? (
                            postData.map((ele, i) => (
                                <tr key={ele._id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6">{i + 1}</td>
                                    <td className="flex flex-col gap-3 w-full py-3 px-6">
                                        <Link href={`/inprocess/${ele._id}`}>
                                            <button className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-white w-full">Edit</button>
                                        </Link>
                                        <button
                                            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white w-full"
                                            onClick={() => handleDelete(ele._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-sm bg-green-500 hover:bg-green-600 text-white w-full"
                                            onClick={() => handleSubmit(ele._id , 'accepted')}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white w-full"
                                            onClick={() => handleSubmit(ele._id , 'rejected')}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                    <td className="py-3 px-6" id={`_status_${i}`}>{ele.status}</td>
                                    <td className="py-3 px-6">{ele.name}</td>
                                    <td className="py-3 px-6">{ele.lastName}</td>
                                    <td className="py-3 px-6">{ele.detail}</td>
                                    <td className="py-3 px-6">{ele.email}</td>
                                    <td className="py-3 px-6">{ele.contact}</td>
                                    <td className="py-3 px-6">{ele.address}</td>
                                    <td className="py-3 px-6">{new Date(ele.createdAt).toLocaleString()}</td>
                                    <td className="py-3 px-6">{new Date(ele.updatedAt).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="py-4 px-6 text-center text-gray-500">
                                    Data not available!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Inporcess