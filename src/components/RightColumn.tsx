import SearchBar from "./SearchBar";

export default function RightColumn() {
    return (
        <div className="mr-[10px] hidden pt-[6px] md:flex md:w-[290px] lg:w-[350px]">
            <SearchBar />
        </div>
    );
}
