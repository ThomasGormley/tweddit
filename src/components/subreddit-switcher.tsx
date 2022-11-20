import useCurrentSubreddit from "@/hooks/use-current-subreddit";
import useSubredditsSearch from "@/hooks/use-subreddits-search";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { Fragment, ReactNode, useState } from "react";
import { useDebounce } from "usehooks-ts";
import LoadingSpinner from "./loading-spinner";

export function SubredditSwitcher() {
    const current = useCurrentSubreddit();
    const [selected, setSelected] = useState(current);
    const [query, setQuery] = useState("");
    const searchText = useDebounce(query, 250);
    const { data, isFetching, status } = useSubredditsSearch(searchText);
    const router = useRouter();
    const handleOnChange = (value: string) => {
        router.push(`/${value}`);
        document.body.focus();
    };

    const subredditNames =
        data?.data.children.map(
            (subreddit) => subreddit.data.display_name_prefixed,
        ) ?? [];

    return (
        <Combobox value={selected} onChange={handleOnChange}>
            <div className="mt-1 sm:relative">
                <div className="flex w-full cursor-default overflow-hidden font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:relative  sm:text-17px">
                    <Combobox.Input
                        className="w-full border-none bg-transparent py-2 text-center outline-none focus:text-start focus:ring-0 sm:w-auto sm:text-start"
                        onFocus={() => setSelected("")}
                        onBlur={() => setSelected(current)}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Subreddit..."
                    />
                    <Combobox.Button className="flex items-center">
                        <ChevronDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                >
                    <Combobox.Options className="glow absolute left-2 right-2 mt-1 max-h-60 overflow-auto rounded-md bg-dim text-base text-off-white shadow-glow shadow-off-white/30 ring-1 ring-off-white/10">
                        {isFetching ? (
                            <SubredditSwitcher.ComboboxOptionsContainer>
                                <div className="flex w-full justify-center">
                                    <LoadingSpinner />
                                </div>
                            </SubredditSwitcher.ComboboxOptionsContainer>
                        ) : selected === "" && status != "success" ? (
                            <SubredditSwitcher.ComboboxOptionsContainer>
                                Search for a Subreddit
                            </SubredditSwitcher.ComboboxOptionsContainer>
                        ) : subredditNames.length === 0 ? (
                            <SubredditSwitcher.ComboboxOptionsContainer>
                                Nothing found.
                            </SubredditSwitcher.ComboboxOptionsContainer>
                        ) : (
                            subredditNames.map((name) => (
                                <Combobox.Option
                                    key={name}
                                    className={({ active }) =>
                                        clsx(
                                            `relative cursor-default select-none rounded-md  py-2 pl-10 pr-4`,
                                            active && "bg-[#1E2732]",
                                        )
                                    }
                                    value={name}
                                >
                                    <span className={`block truncate `}>
                                        {name}
                                    </span>
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
}

type ComboboxOptionsContainerProps = {
    children?: ReactNode;
};
const ComboboxOptionsContainer = ({
    children,
}: ComboboxOptionsContainerProps) => {
    return (
        <div className="relative cursor-default select-none py-2 px-4 text-off-white">
            {children}
        </div>
    );
};

SubredditSwitcher.ComboboxOptionsContainer = ComboboxOptionsContainer;
