import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(()=>{
    const fetchAllBlogs=async()=>{
      const res =await axios.get("http://localhost:9000/api/v1/get/allblogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(res.data);
    };  
    fetchAllBlogs();
  },[]);

  return (
    <>
      <main class="my-5">
        <div class="container shadow-lg">
          <section class="text-center">
            <h2 class="mb-5 my-3">
              <strong>Latest posts</strong>
            </h2>
          </section>

          <div class="row">
            {blogs && blogs.length>0 ?
            
            blogs.map((item)=>{
              return (
                console.log(item.thumbnail),
                <div class="col-lg-4 col-md-12 mb-4">
                <div class="card text-center"> {/* Added text-center here */}
                <div
                  class="bg-image hover-overlay ripple"
                  data-mdb-ripple-color="light"
                >

<img
  src={`http://localhost:9000/${item.thumbnail}`}
  className="img-fluid"
  alt="Post Thumbnail"
/>
                  <a href="#!">
                    <div
                      class="mask"
                      style={{
                        backgroundColor: "rgba(251,251,251,0.15)",
                      }}
                    ></div>
                  </a>
                </div>
                <div class="card-body"> {/* Added card-body for consistent spacing */}
                  <h5 class="card-title">{item.title}</h5>
                  <p class="card-text">{item.description}</p>
                 
                  <Link to={`/blog/${item._id}`} class="btn btn-primary">
                  READ MORE
                  </Link>
                </div>
              </div>
            </div>
              )
            })
            : <h2>Loading...</h2> }
          </div>
        </div>
      </main>

      <footer class="bg-primary text-lg-start">
        <div
          class="text-center p-3 text-white"
          style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
        >
          2024 copyright:
          <a class="text-white mx-2" href="https://mdbootstrap.com/">
            code with saubhagya
          </a>
        </div>
      </footer>
    </>
  );
};

export default Home;
