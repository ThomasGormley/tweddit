import formatTimeDistanceToNowShortSuffix from "@/lib/util/format-time-distance-to-now-short-suffix";

describe.skip("formatTimeDistanceToNowShortSuffix", () => {
    it("should return short formatted date string", () => {
        const time = new Date(1647776814.0 * 1000);
        const actual = formatTimeDistanceToNowShortSuffix(time);

        console.log({ actual });

        expect(actual).toBeDefined();
    });
});
