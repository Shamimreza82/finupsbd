/* eslint-disable @typescript-eslint/no-explicit-any */

export const buildNestedComments = (comments: any) => {
  const map = new Map();
  comments.forEach((c: { id: any }) => map.set(c.id, { ...c, replies: [] }));

  const roots: any[] = [];

  map.forEach((comment) => {
    if (comment.parentId) {
      const parent = map.get(comment.parentId);
      if (parent) {
        parent.replies.push(comment);
      } else {
        // Orphaned comment with missing parent, treat as root
        roots.push(comment);
      }
    } else {
      roots.push(comment);
    }
  });

  return roots;
};
