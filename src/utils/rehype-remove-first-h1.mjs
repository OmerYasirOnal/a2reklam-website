import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to remove the first H1 from markdown content.
 * This ensures only one H1 exists per page (the template H1 from frontmatter).
 * SEO-safe: removes the node from the AST, not just hiding with CSS.
 */
export default function rehypeRemoveFirstH1() {
  return (tree) => {
    let firstH1Found = false;

    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'h1' && !firstH1Found) {
        firstH1Found = true;
        // Remove this node from the parent
        if (parent && typeof index === 'number') {
          parent.children.splice(index, 1);
          // Return index to continue visiting from the correct position
          return [visit.SKIP, index];
        }
      }
    });
  };
}
