import RightColumn from "./RightColumn";

interface MainWrapperProps {
    children: React.ReactNode;
}
export default function MainWrapper({ children }: MainWrapperProps) {
    return (
        <main className="flex flex-shrink flex-grow flex-row min-w-0 justify-center sm:justify-start items-start text-14px sm:text-15px">
            <div className="flex justify-between md:w-[920px] lg:w-[990px]">
                {children}
                <RightColumn />
            </div>
        </main>
    );
}
