import {NodeConfig, NodeViewWrapper, ReactNodeViewRenderer} from '@tiptap/react';
import {Node} from '@tiptap/core';
import {TestChoice} from "./Choice/TestChoice.tsx";

const ReactComponentNode = Node.create({
    name: 'reactComponent',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            content: {
                default: '{}',
                parseHTML: (element: HTMLElement) => {
                    const jsonString = element.getAttribute('data-content') || '{}';
                    let content = {};
                    try {
                        content = JSON.parse(jsonString);
                    } catch (error) {
                        console.error('Failed to parse JSON', error);
                    }
                    return content;
                },
                renderHTML: (attributes) => {
                    return {'data-content': JSON.stringify(attributes.content)};
                },
            },
            edit: false,
        };
    },

    parseHTML() {
        return [
            {
                tag: 'react-component',
            },
        ];
    },

    renderHTML({HTMLAttributes}) {
        return ['react-component', {'data-content': JSON.stringify(HTMLAttributes.content)}];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ReactComponent);
    },
} as Partial<NodeConfig>);

const ReactComponent = ({node, updateAttributes}) => {
    if (!node.attrs.content) {
        return null;
    }

    return (
        <NodeViewWrapper className="react-component">
            {(node.attrs.content.type === 'mono' || node.attrs.content.type === 'multi') &&
                <TestChoice question={node.attrs.content} updateAttributes={updateAttributes}/>}
        </NodeViewWrapper>
    );
};

export default ReactComponentNode;
