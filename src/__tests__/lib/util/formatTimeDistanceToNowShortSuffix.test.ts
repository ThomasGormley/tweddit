import formatTimeDistanceToNowShortSuffix from "src/lib/util/formatTimeToNowShortSuffix";

describe.skip("formatTimeDistanceToNowShortSuffix", () => {
    it("should return short formatted date string", () => {
        const time = new Date(1647776814.0 * 1000);
        const actual = formatTimeDistanceToNowShortSuffix(time);

        console.log({ actual });

        expect(actual).toBeDefined();
    });
});
