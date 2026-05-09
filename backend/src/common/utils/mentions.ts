export function extractMentions(
  text: string
) {

  const regex = /@([a-zA-Z0-9._-]+)/g;

  return [...text.matchAll(regex)]
    .map(match => match[1]);
}
