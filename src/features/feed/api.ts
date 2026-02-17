export type FeedPost = {
  id: number;
  title: string;
  body: string;
};

export async function fetchPosts(): Promise<FeedPost[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15');
  if (!response.ok) {
    throw new Error('Unable to load feed right now.');
  }
  const json = (await response.json()) as FeedPost[];
  return json;
}
