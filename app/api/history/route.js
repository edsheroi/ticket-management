import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Post from '@/models/post'

export async function GET(req) {
    try {
        await connectMongoDB()
        const postData = await Post.find({ status: { $in: ['accepted', 'rejected'] } });
        return NextResponse.json({postData})

    } catch (error) {
        return NextResponse.json({ message: "An error occurred while Get" }, { status: 500 })
    }
}