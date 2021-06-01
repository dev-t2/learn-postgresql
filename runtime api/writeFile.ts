const encoder = new TextEncoder();
const text = encoder.encode('Hello world');

await Deno.writeFile('hello.txt', text);
