import React from 'react';

export default function Footer() {
    return (
        <div className="flex justify-center items-center h-10">
            &copy; Blinkzy - {new Date().getFullYear()}
        </div>
    );
}
