import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
function Header() {
    return (
        <header className="p-5">
            <nav>
                <div className="px-5 flex gap-3 justify-between">
                    <Link href="/" className=" text-red-500 rounded-lg ">
                        <Image src="/static/logo.png" width={'40'} height={'40'} alt="logo" />
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
