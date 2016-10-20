# docker-graph-api
HTTP proxy to docker rest api. Exposes Graph QL for docker

This project is about building a graph QL proxy to githubs Remote API.

By default github remote api is available over UNIX socket. 

This project aims to expose Docker api over standard tcp (HTTP) interface with any type of authentication you want to implement.
Additionaly it exposes the api through Graph QL. Because, why not :) ?
