
//
const Layout = {
  /**
   *
   * @param key: any
   *
   * @return
   */  
  startProc : async function() : Promise<any>
  {
//console.log("#Layout.startProc");
    let ret = false;
    const parsedUrl = new URL(window.location.href);
    if(
      !(parsedUrl.pathname === '/login' ||
       parsedUrl.pathname === '/basic_login' ||
       parsedUrl.pathname === '/user/create'
       )
    )
    {
console.log("pathname=", parsedUrl.pathname);
    }
    return ret;
  }
}
Layout.startProc();

export default Layout;
