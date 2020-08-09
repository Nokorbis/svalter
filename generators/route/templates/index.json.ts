export function get(req: any, res: any) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end({value: 'Hello World'});
}
