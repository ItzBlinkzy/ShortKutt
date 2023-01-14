import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
function Header() {
    return (
        <header className="p-5 bg-red-300">
            <nav>
                <div className="flex gap-3 justify-between">
                    <Link href="/" className="px-2 py-1 text-red-500 rounded-lg ">
                        <Image src="/static/logo.png" width={'30'} height={'30'} alt="logo" />
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
