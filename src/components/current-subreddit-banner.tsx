import useRedditQuery from "@/hooks/use-reddit-query";
import useSubredditsSearch from "@/hooks/use-subreddits-search";
import { Combobox, Transition } from "@headlessui/react";
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useDebounce } from "usehooks-ts";
import Banner from "./banner";
import UserAvatar from "./user-avatar";

export function CurrentSubredditBanner({}) {
    const { asPath } = useRouter();
    const currentSubreddit = asPath === "/" ? "Home" : asPath;

    return (
        <Banner>
            <div className="block pl-[16px] sm:hidden">
                <div className="h-[32px] w-[32px] ">
                    <UserAvatar />
                </div>
            </div>
            <div className="px-0 sm:px-[16px]">
                <SubredditSwitcher current={currentSubreddit} />
            </div>
            <div className="flex items-center justify-end pr-[16px]">
                <div className="flex w-[32px] justify-center sm:w-auto">
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        fill="currentColor"
                        className="h-[19px] w-[19px] text-[#eff3f4]"
                    >
                        <g>
                            <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </Banner>
    );
}

// const people = [
//     { id: 1, name: "Durward Reynolds" },
//     { id: 2, name: "Kenton Towne" },
//     { id: 3, name: "Therese Wunsch" },
//     { id: 4, name: "Benedict Kessler" },
//     { id: 5, name: "Katelyn Rohan" },
// ];

function SubredditSwitcher({ current }: { current: string }) {
    const [selected, setSelected] = useState(current);
    const [query, setQuery] = useState("");
    const searchText = useDebounce(query, 250);
    const { data } = useSubredditsSearch(searchText);
    console.log({ data });

    const subredditNames =
        data?.data.children.map(
            (subreddit) => subreddit.data.display_name_prefixed,
        ) ?? [];
    // const filteredPeople =
    //     query === ""
    //         ? people
    //         : people.filter((person) =>
    //               person.name
    //                   .toLowerCase()
    //                   .replace(/\s+/g, "")
    //                   .includes(query.toLowerCase().replace(/\s+/g, "")),
    //           );

    return (
        <Combobox value={selected} onChange={setSelected}>
            <div className="mt-1 sm:relative">
                <div className="flex w-full cursor-default overflow-hidden font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-17px  sm:relative">
                    <Combobox.Input
                        className="w-full sm:w-auto border-none bg-transparent py-2 outline-none focus:ring-0 text-center sm:text-start"
                        // displayValue={(person: typeof people[number]) =>
                        //     person.name
                        // }
                        onFocus={() => setSelected("")}
                        onBlur={() => setSelected(current)}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder='Subreddit...'
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
                        {subredditNames.length === 0 ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
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
                                    {({ selected, active }) => (
                                        <>
                                            <span className={`block truncate `}>
                                                {name}
                                            </span>
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
}

export default CurrentSubredditBanner;
