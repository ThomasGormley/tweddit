import { HomeIcon } from "@heroicons/react/solid";
import React from "react";

export default function MobileNavigation() {
    return (
        <div className="fixed inset-x-0 bottom-0 z-10 h-14 border-t border-dim-border bg-dim sm:hidden">
            <nav
                aria-label="Primary"
                className="flex h-full w-full flex-row items-center justify-between px-[24px]"
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
