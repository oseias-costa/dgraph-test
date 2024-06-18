
export const resourceQuery = (resource: string) => {
    if(resource === 'root') {
        return `
            query($id: [ID!]){
                queryRoot(filter: {id: $id}) {
                    id
                    name
                    organization {
                        id
                        name
                        enviroment{
                            id
                            name
                        }
                    }
                }
            }
        `
    }

    if(resource === 'organization') {
        return `
            query($id: [ID!]){
                queryOrganization(filter: {id: $id}) {
                    id
                    name
                    enviroment {
                        id
                        name
                    }
                    root {
                        id
                        name
                    }
                    }
                }
            }
        `
    }

    if(resource === 'enviroment'){
        return `
             query($id: [ID!]){
                queryEnviroment(filter: {id: $id}) {
                    id
                    name
                    organization{
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
        `
    }

} 