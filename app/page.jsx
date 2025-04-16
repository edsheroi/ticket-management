'use client'

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen px-6 py-10 rounded-lg shadow-lg bg-gray-200">
      <h4 className="text-2xl font-bold mb-4 font-main-title">
        This is a simple helpdesk support ticket management application
      </h4>
      <p className=" text-center mb-6 font-main-title">
        Manage and track the status of your tickets in one place.
      </p>
      <Link
        href="/register"
        className="bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-6 rounded-lg text-lg font-semibold transition duration-300"
      >
        Click here to Register
      </Link>
    </div>
  );
}
