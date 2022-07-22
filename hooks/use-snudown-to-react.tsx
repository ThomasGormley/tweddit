import React, { ReactElement } from "react";
import { markdown } from "snudown-js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HtmlToReact from "html-to-react";

function isValidNode() {
    return true;
}

const htmlToReactParser = new HtmlToReact.Parser();
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

const preprocessingInstructions = [
    {
        shouldPreprocessNode: function (node: any) {
            return node.parent.name === "a";
        },
        preprocessNode: function (node: any) {
            console.log({ node });

            node.parent.attribs = {
                style: "text-decoration-line: underline;",
            };
        },
    },
];

const processingInstructions = [
    {
        shouldProcessNode: function (node: any) {
            return node.parent.name === "a";
        },
        processNode: function (node: any, children: any, index: any) {
            return node?.data?.toUpperCase();
        },
    },
    {
        // Anything else
        shouldProcessNode: function (node: any) {
            return true;
        },
        processNode: processNodeDefinitions.processDefaultNode,
    },
];

export default function useSnudownToReact(md: string): {
    reactElement: ReactElement;
    data: Record<string, unknown>;
} {
    const html = markdown(md);
    const reactElement = htmlToReactParser.parseWithInstructions(
        html,
        isValidNode,
        processingInstructions,
        preprocessingInstructions,
    );

    return {
        reactElement: reactElement,
        data: {
            hasMedia: true,
        },
    };
}
