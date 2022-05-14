export default function SearchBar() {
    return (
        <div className="fixed flex w-[inherit] flex-col">
            <div className="">
                <form
                    aria-label="Search Tweddit"
                    role="search"
                    className="flex w-full  items-center justify-center rounded-full bg-[#273340] text-off-white"
                >
                    <div className="ml-[8px]">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            fill="currentColor"
                            className="h-6 w-6 min-w-[32px] pl-[12px] text-[#8b98a5]"
                        >
                            <g>
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                            </g>
                        </svg>
                    </div>
                    <input
                        type="search"
                        placeholder="Search Tweddit"
                        className="ml-[2px] w-full bg-transparent p-[12px] text-15px "
                    ></input>
                </form>
            </div>
        </div>
    );
}
