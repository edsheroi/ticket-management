import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Post from '@/models/post'

export async function POST(req) {
    try {
        const { detail, contact, email, address , name , lastName} = await req.json();
        await connectMongoDB()
        console.log( detail, contact, email, address , name , lastName)
        await Post.create({detail , contact , email , address , name , lastName})
        return NextResponse.json({ message: "Post Created" }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: "An error occurred while Post" }, { status: 500 })
    }
}

export async function GET(req) {
    try {
        await connectMongoDB()
        const postData = await Post.find({ status: { $nin: ['accepted', 'rejected'] } })
        return NextResponse.json({ postData })
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while Get" }, { status: 500 })
    }
}