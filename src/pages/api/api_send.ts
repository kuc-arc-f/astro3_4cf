import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const url = import.meta.env.PUBLIC_API_URL;
//console.log("#api_send.post");
//console.log(body);
//console.log("path=", body.path);
//console.log("#api_send.post_end");
  const sendBody: any = JSON.stringify(body);
  const res = await fetch(url +  body.path, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},      
    body: sendBody
  });
//console.log("res.status=", res.status); 
  const json = await res.json();
//console.log("#json"); 
//console.log(json);     
//console.log("#json.end"); 
/*
  return {
    body: JSON.stringify(json)
  }
*/
  return new Response(JSON.stringify(json), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}