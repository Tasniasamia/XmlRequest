import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // # api integration by XMLHttpRequest
  const [data, setData] = useState([]);
  const [msg,setMsg]=useState("NO Data");

  // Beginner Way-----------------------------------
  //*************************************************
  // const getData=()=>{
  //   const xhr=new XMLHttpRequest();
  //   xhr.open('GET','https://jsonplaceholder.typicode.com/posts')
  //   xhr.onload=()=>{
  //     setData(xhr.response)
  //     console.log(xhr.response)
  //   }
  //   xhr.send()
  // }

  //Developer way  Without using promise
  // const makeRequest = (method, url, data) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open(method, url);
  //   xhr.setRequestHeader( 'Content-type', 'application/json; charset=UTF-8',)
  //   xhr.onload = () => {
  //     setData(xhr.response);
  //     if(data){
  //       setMsg("Data Has here")
  //     }
  //     console.log(xhr.response);
  //     console.log(Object.keys(xhr.response).length)
  //     if(Object.keys(xhr.response).length === 2){
  //       setMsg("Data is deleted")
  //     }
  //   };
  //   xhr.send(JSON.stringify(data));
  // };


 
  const makeRequest = (method, url, data) => {
    return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader( 'Content-type', 'application/json','charset=UTF-8',)
    xhr.onload = () => {
      setData(xhr.response);
      if(data){
        setMsg("Data Has here")
      }
      console.log(xhr.response);
      if (typeof xhr.response === "object"){
        console.log(Object.keys(xhr.response).length)
        if(Object.keys(xhr.response).length === 2){
          setMsg("Data is deleted")
        }
      }
    
    };
    xhr.send(data);
  })
  };
   //Developer way  With using promise
   const getData = (method, resource, data) => {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.addEventListener("readystatechange", () => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            let responseData = JSON.parse(request.responseText);
            resolve(responseData);
          } else {
            let errorMessage = "Error getting resources: " + request.statusText;
            console.error(errorMessage);
            reject(new Error(errorMessage)); // Reject with an Error object
          }
        }
      });
      request.open(method, resource);
      request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
      request.send(JSON.stringify(data));
    });
  };
  
  return (
      <div>
      <h1>By XMLHttpRequest : Without Using Promise</h1>
      <div>
      {/* GET */}
      <button
        onClick={() => {
          makeRequest("GET" , "https://jsonplaceholder.typicode.com/posts")
      
        }}
      >
        getData
      </button>
      {/* POST */}
      <button
        onClick={() => {
          makeRequest("POST", "https://jsonplaceholder.typicode.com/posts", {
            title: "foo",
            body: "bar",
            userId: 1,
          });
        }}
      >
        PostData
      </button>
      {/* PUT */}
      <button
        onClick={() => {
          makeRequest("PUT", "https://jsonplaceholder.typicode.com/posts/1", {
            title: "bar",
            body: "foo",
            userId: 1,
          });
        }}
      >
        UpdateData by PUT method
      </button>
      {/* PATCH */}
      <button
        onClick={() => {
          makeRequest("PATCH", "https://jsonplaceholder.typicode.com/posts/1", {
            title: "bar1",
           
          });
        }}
      >
        UpdateData by PATCH method
      </button>
      {/* DELETE */}
      <button
        onClick={() => {
          makeRequest("DELETE", "https://jsonplaceholder.typicode.com/posts/1");
        }}
      >
        Delete Data      
      </button>
      {/* <p>{data.length>0 && data}</p>
      <p>{msg}</p> */}

    </div>

      <div>
      <h1>By XMLHttpRequest : By using Promise</h1>
      {/* GET */}
      <button
        onClick={() => {
          getData("GET","https://jsonplaceholder.typicode.com/posts") 
          .then((data) => {
            setData(JSON.stringify(data))
            console.log("promise resolved", data);
          })
          .catch((err) => {
            console.log("promise rejected", err);
          });
        }}
      >
        getData
      </button>
    {/* POST */}
    <button
  onClick={() => {
    getData("POST", "https://jsonplaceholder.typicode.com/posts", {
      title: "apple",
      body: "fruite",
      userId: 1,
    })
    .then((data) => {
      setData(JSON.stringify(data));
      console.log("promise resolved POST", data);
    })
    .catch((error) => {
      console.error("Error:", error.message); // Display the error message
      // You can also show an error message to the user here
    });
  }}
>
  PostData
</button>

        {/* PUT */}
    <button
        onClick={() => {
          getData("PUT", "https://jsonplaceholder.typicode.com/posts/1", {
            title: "bar",
            body: "foo",
            userId: 1,
          }).then((data)=>{setData(data)})
        }}
      >
        Update Data by PUT Method
      </button>
        {/* PATCH */}
    <button
        onClick={() => {
          makeRequest("PATCH", "https://jsonplaceholder.typicode.com/posts/1", {
            title: "barr1",
           
          })
          .then((data)=>{setData(data)})
        }}
      >
        Update Data by PATCH Method
      </button>
        {/* DELETE */}
    <button
        onClick={() => {
          makeRequest("DELETE", "https://jsonplaceholder.typicode.com/posts/1")
          .then((response)=>{
            setData(response);
            console.log("delete response",response)
            // if(Object.keys(response).length === 2){
            //   setMsg("Data is deleted")
            // }
          })
        }}
      >
        DELETE
      </button>
      <p>{data.length>0 && data}</p>
      <p>{msg}</p>
    </div>
    </div>
  );
}

export default App;
