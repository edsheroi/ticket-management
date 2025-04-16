'use client'

import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 shadow-sm bg-black text-white">
            <div className="flex-1">
                <Link className="btn btn-ghost text-xl hover:btn-success" href={'/'}>Home</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 hover:text-emerald-500">
                    <li><Link href={'/register'}>Register</Link></li>
                </ul>
                <ul className="menu menu-horizontal px-1 hover:text-emerald-500">
                    <li><Link href={'/inprocess'}>Inporcess</Link></li>
                </ul>
                <ul className="menu menu-horizontal px-1 hover:text-emerald-500">
                    <li><Link href={'/history'}>History</Link></li>
                </ul>
            </div>
        </div>
    )
}