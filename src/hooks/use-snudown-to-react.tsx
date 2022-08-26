import * as snudown from "snudown-js";
import parse, {
    DOMNode,
    Element,
    HTMLReactParserOptions,
} from "html-react-parser";

// shouldProcessNode: function (node: any) {
//     return node.parent.name === "a";
// },
// processNode: function (node: any, children: any, index: any) {
//     return node?.data?.toUpperCase();
// },

function domNodeIsElement(domNode: DOMNode): domNode is Element {
    return domNode.type === "tag";
}

let hasAnchor = false;
const options: HTMLReactParserOptions = {
    replace(domNode) {
        if (!domNodeIsElement(domNode)) return;
        const element = domNode;
        switch (element.name) {
            case "a":
                hasAnchor = true;

                element.attribs = {
                    className: "underline",
                    ...element.attribs,
                };
                return element;

            default:
                break;
        }
    },
};

export default function useSnudownToReact(md: string): {
    reactElement: string | JSX.Element | JSX.Element[];
    data: Record<string, unknown>;
} {
    const html = snudown.markdown(md, { nofollow: false });
    const reactElement = parse(html, options);

    return {
        reactElement,
        data: {
            hasAnchor,
        },
    };
}
