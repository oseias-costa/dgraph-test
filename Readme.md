
### Run with docker
docker run --name dgraph-container -d -p "8080:8080" -p "9080:9080" -v dgraph:/dgraph dgraph/standalone

### Queries I used on the playground
change the endpoint to:
http://localhost:8080/graphql
https://lucasconstantino.github.io/graphiql-online/

mutation {
  addOrganization(input: {name: "Organization 4", root: {id: "0x6"}) {  
    organization {
      name
      enviroment{
        name
      }
		}
  }
}

mutation {
    addEnviroment(input: {name: "Ambiente Teste", organization: {id: "0xa"}}){
      enviroment{
        name
        id
      }
	}
}

query {
  queryUser{
    id
    name
    Enviroment {
      id
      name
      organization {
        id
        name
        root {
          id
          name
        }
      }
    }
  }
}

query {
  queryUser{
    id
    name
    Enviroment {
      id
      name
    }
  }
  
  queryEnviroment {
    id
    name
    users {
      id
      name
    }
  }
}

	
mutation {
    addRoot(input: {name: "Root Name"}){
      root {
        name
        id
      }
	}
}

query{
  queryEnviroment {
    id
    name
    users {
      id
      name
    }
  }
}

query {
  queryRoot {
    id
    name
    organization {
      id
      name
      enviroment{
        id
        name
        organization{
          root {
            id
            name
          }
        }
      }
    }
  }
}

query {
  queryRoot(filter:{id: "0x9"}) {
    id
    name
    organization {
      id
      name
    }
  }
}

query {
  queryOrganization {
    id
    name
    root {
      id
      name
    }
  }
}

query {
  queryEnviroment {
    id
    name
    organization {
      id
      name
      root {
        id
        name
      }
    }
  }
}

query {
  queryOrganization{
    id
    name
    root {
      id
      name
    }
    organization {
      id
      name
    }
 }
}

mutation {
  addRoot(input: {name: "root-oseias"}) {
    root {
      id
      name
    }
  }
}

query {
  queryRoot(filter: {id: "0x5"}) {
      id
      name
  }
}

query {
  getRoot(id: "0x5") {
    id
    name
  }
}

mutation {
  updateRoot(input: {filter:{id: "0x5"}, set: {name: "root-oseias"}}) {
    root {
      id
      name
    }
  }
}

mutation {
  deleteRoot(filter: { id: "0x5"}) {
    root {
      id
      name
    }
  }
}

mutation {
  addOrganization(input: {name: "Org For Root 4", root:{id: "0x8"}}) {
    organization {
    id
    name
  }
}
  
query {
  queryOrganization {
    id
    name
    root {
      id
      name
    }
  }
}

mutation ($id: [ID!], $orgId: ID!) {
  updateRoot(input: {filter: {id: $id}, set:{organization: {id: $orgId}}}){
    root{
      id
      name
      organization{
        id
        name
      }
    }
  }
}
  
mutation {
  addOrganization(input: {name: "Teste", root: {id: "0x8"}}){
    organization {
      id
      name
    }
  }
}

