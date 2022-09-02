import { HomeIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";
import { primaryNavigationItems } from "./navigation";

export default function MobileNavigation() {
    return (
        <div className="fixed inset-x-0 bottom-0 z-10 flex border-t border-dim-border bg-dim pb-safe sm:hidden">
            <nav
                aria-label="Primary"
                className="flex w-full items-center justify-between py-3"
            >
                {primaryNavigationItems
                    .filter((item) => item.isMobileVisible)
                    .map((item) => (
                        <div
                            className="flex w-full justify-center"
                            key={item.title}
                        >
                            <Link href={item.url} className="" passHref>
                                <a href="" className="h-[24px] w-[24px]">
                                    {item.icons.active ?? item.icons.inactive}
                                </a>
                            </Link>
                        </div>
                    ))}
            </nav>
        </div>
    );
}
