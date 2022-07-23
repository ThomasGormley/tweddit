import { markdown } from "snudown-js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HtmlToReact from "html-to-react";

const htmlToReactParser = new HtmlToReact.Parser();

function SnudownToReact({ md }: { md: string }) {
    const html = markdown(md);
    const reactElement = htmlToReactParser.parse(html);

    return reactElement;
}

export default SnudownToReact;
