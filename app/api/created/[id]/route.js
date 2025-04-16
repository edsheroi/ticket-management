import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Post from '@/models/post'

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        await connectMongoDB()
        const postData = await Post.findOne({ _id: id })
        return NextResponse.json({ postData })

    } catch (error) {
        return NextResponse.json({ message: "An error occurred while Get" }, { status: 500 })
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const { detail, email, contact, address, name, lastName } = await req.json()
        await Post.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                name : name,
                lastName : lastName,
                detail: detail,
                email: email,
                contact: contact,
                address: address,
                status: 'resolved'
            }
        })
        return NextResponse.json({ message: 'Successly to update' }, { status: 201 })
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = await params
        await connectMongoDB()
        await Post.findOneAndDelete({
            _id: id
        })

        return NextResponse.json({ message: "Successly to delete post!" }, { status: 201 })
    } catch (error) {
        console.log(error)
    }
}

export async function POST(req, { params }) {
    try {
        const { id } = await params
        const { type } = await req.json();

        await connectMongoDB()

        console.log(type)
        switch (type) {
            case 'accepted':
                await Post.findOneAndUpdate({ _id: id }, {
                    $set: {
                        status: 'accepted'
                    }
                })
                break;
            case 'rejected' :
                await Post.findOneAndUpdate({ _id: id }, {
                    $set: {
                        status: 'rejected'
                    }
                })
        }

        return NextResponse.json({ message: 'Successly to accepted post!' }, { status: 201 })
    } catch (error) {
        console.log(error)
    }
}