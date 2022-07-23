import React from "react";

interface BannerProps {
    children?: React.ReactNode;
}
export default function Banner({ children }: BannerProps) {
    return (
        <header
            role="banner"
            className="sticky -top-[1px] z-10 flex h-[53px] items-center justify-between bg-dim/75 backdrop-blur-md"
        >
            {children}
        </header>
    );
}
