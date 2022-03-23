import { HomeIcon } from "@heroicons/react/solid";
import React from "react";

export default function MobileNavigation() {
    return (
        <div className="fixed pb-safe inset-x-0 bottom-0 z-10 border-t border-dim-border bg-dim sm:hidden">
            <nav
                aria-label="Primary"
                className="flex h-full w-full flex-row items-center justify-between px-[24px] py-3"
            >
                {Array.from({
                    length: 4,
                }).map((item: any, i: number) => (
                    <a key={i} className="px-4">
                        <HomeIcon className="h-7 w-7" />
                    </a>
                ))}
            </nav>
        </div>
    );
}
