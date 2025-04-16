'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import $ from 'jquery'

function History() {

    const [postData, setPostData] = useState([])

    async function getPostData() {
        try {
            const res = await fetch('http://localhost:3000/api/history', {
                method: "GET",
                cache: 'no-store'
            })

            if (!res.ok) {
                throw new Error('Failed to load get Data!')
            }

            const data = await res.json()
            setPostData(data.postData)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPostData()
    }, [])

    console.log(postData)
    postData.forEach((ele,i) => {
        if (ele.status === 'rejected') {
            $(`#_status_${i}`).addClass('text-red-500');
        }else{
            $(`#_status_${i}`).addClass('text-green-500');
        }
    })
    
    return (
        <div className='overflow-x-auto bg-gray-200 h-screen'>
            <div className="overflow-x-auto mx-5 my-6 px-5 py-4 bg-white shadow-lg rounded-xl">
                <table className='min-w-full table-auto border border-gray-200'>
                    <thead className='bg-gray-100 text-gray-700 text-md font-semibold'>
                        <tr>
                            <th className="py-3 px-6 text-left">#</th>
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
                        {
                            postData && postData.length > 0 ? (
                                postData.map((ele, i) => (
                                    <tr key={ele._id} className='border-b border-gray-300'>
                                        <td className="py-3 px-6">{i + 1}</td>
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
                                    <td colSpan="10" className="py-4 px-6 text-center text-gray-500">
                                        Data not available!
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default History