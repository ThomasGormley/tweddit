interface MainWrapperProps {
    children: React.ReactNode;
}
export default function MainWrapper({ children }: MainWrapperProps) {
    return (
        <main className="flex flex-shrink flex-grow flex-row items-start text-14px sm:text-15px">
            <div className="flex justify-between md:w-[920px] lg:w-[990px]">
                {children}
            </div>
        </main>
    );
}
