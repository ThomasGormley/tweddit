import { HomeIcon } from "@heroicons/react/solid";

export function Navigation() {
    return (
        <header
            role="banner"
            className="hidden flex-[0.3] flex-col items-end sm:flex"
        >
            <div className="flex h-full w-[88px] flex-col justify-between p-[12px] ">
                <div className="flex flex-col items-center space-y-[6px]">
                    <div className="">
                        <h1 role="heading">
                            <a href="/" aria-label="Tweddit" role="link">
                                LOGO
                            </a>
                        </h1>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        {Array.from({
                            length: 5,
                        }).map((item: any, i: number) => (
                            <span key={i} className="p-[12px]">
                                <HomeIcon className="h-6 w-6" />
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mx-0 mb-[4px] w-full ">
                    <span>avatar</span>
                </div>
            </div>
        </header>
    );
}
