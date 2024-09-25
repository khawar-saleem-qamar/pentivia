export async function fetchApi(url, method, body, callback, token="", json=true){
    try {
        var headers = {}

        if(token != ""){
          headers['Authorization'] = `Bearer ${token}`
        }

        if(json){
            headers["Content-Type"] = "application/json"
            body = JSON.stringify(body)
        }
        console.log("body: ", body)
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}${url}`, {
        method,
        headers,
        body
      })

      const data = await res.json();
      if(!data.success){
        callback(false, data.body);
      }else{
        callback(true, data.body)
      }
    } catch (error) {
        console.log(error);
      callback(false, "Something went wrong");
    }
  }