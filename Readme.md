
### Run with docker
docker run --name dgraph-container -d -p "8080:8080" -p "9080:9080" -v dgraph:/dgraph dgraph/standalone

## up schema to db
curl -X POST localhost:8080/admin/schema --data-binary '@schema.graphql'

### Queries I used on the playground
change the endpoint to:
http://localhost:8080/graphql 
https://lucasconstantino.github.io/graphiql-online/

```graphql
mutation {
  addResource(input: {name: "Root Test", type: "ROOT") {  
    resource {
      id
      name
      type
		}
  }
}

query {
  queryResource{
    id
    name
    type
    children {
      id
      name
      type
      children {
        id
        name
        type
    }
    }
    parent {
      id
      name
      type
      parent {
        id
        name
        type
      }
    }
  }
}

mutation {
  addResource(input: {name: "Organization 4", type: "ORGANIZATION", parent: {id: "0x6"}) {  
    resource {
      id
      name
      type
		}
  }
}

```