import { match } from "@/lib/util/match";

describe("match", () => {
    const lookup = {
        string: "string value",
        function: () => "test",
    };

    const fnSpy = jest.spyOn(lookup, "function");

    it("should return corresponding string value in lookup", () => {
        const actual = match("string", lookup);
        expect(actual).toEqual(lookup.string);
    });

    it("should invoke function key in lookup", () => {
        const actual = match("function", lookup);
        expect(actual).toEqual("test");
        expect(fnSpy).toBeCalled();
    });

    it("should throw error when value does not exist", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        expect(() => match("doesnotexist", lookup)).toThrowError(
            `Tried to handle "doesnotexist" but there is no handler defined. Only defined handlers are: "string", "function".`,
        );
    });
});
