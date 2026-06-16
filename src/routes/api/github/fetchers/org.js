export async function main() {
  return new Response(JSON.stringify({ data: "hello world!" }));
}

export default main;