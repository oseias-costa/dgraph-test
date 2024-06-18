import { Injectable } from '@nestjs/common';
import { CreateRootDto } from './dto/create-root.dto';
import { UpdateRootDto } from './dto/update-root.dto';
import { CreateResourceDto } from './dto/create-resource.dto';
import axios from 'axios';
import { resourceQuery } from './queries/queries';

@Injectable()
export class ResourceService {
  async create(createRootDto: CreateRootDto) {
    const { name, resource } = createRootDto;
    const resourceConverted = ResourceService.convertFirstLetter(resource);
    const res = await axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `
          mutation ($name: String!){
            add${resourceConverted}(input: {name: $name}) {
              ${resource} {
                id
                name
              }
            }
          }
        `,
        variables: { name },
      },
    });

    return res.data.data[`add${resourceConverted}`];
  }

  async getOrganizations(root: string) {
    const res = await axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `
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
        `,
        variables: { id: root },
      },
    });

    return res.data.data.queryRoot;
  }

  async createResource(createResource: CreateResourceDto) {
    const { resourceType, resourceName, resourceParentId, resourceParentType } =
      createResource;
    const resourceConverted = ResourceService.convertFirstLetter(resourceType);
    const resourceParentConvert =
      ResourceService.convertFirstLetter(resourceParentType);

    const create = await axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `
          mutation($name: String!, $id: ID!){
            add${resourceConverted}(input: {name: $name, ${resourceParentType}: {id: $id}}) {
              ${resourceType} {
                id
                name
              }
            }
          }
        `,
        variables: { name: resourceName, id: resourceParentId },
      },
    });

    const resourceId =
      create.data.data[`add${resourceConverted}`][`${resourceType}`][0].id

    const update = await axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `
        mutation ($id: [ID!], $resourceId: ID!) {
          update${resourceParentConvert}(input: {filter: {id: $id}, set:{${resourceType}: {id: $resourceId}}}){
            ${resourceParentType}{
              id
              name
              ${resourceType}{
                id
                name
              }
            }
          }
        }
        `,
        variables: { resourceId: resourceId, id: resourceParentId },
      },
    });

    return update.data.data[`update${resourceParentConvert}`][`${resourceParentType}`]
  }

  async findResourceTree(resource: string, id: string) {
    const resourceConverted = ResourceService.convertFirstLetter(resource);
    const query = resourceQuery(resource)

    const res = await axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `${query}`,
        variables: { id: id },
      },
    });
    console.log(res.data.error)

    // return res.data.data[`query${resourceConverted}`];
  }

  async findAll(resource: string) {
    const resourceConverted = ResourceService.convertFirstLetter(resource);

    const res = await axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `
          query {
            query${resourceConverted} {
              id
              name
            }
          }
        `,
      },
    });
    return res.data.data[`query${resourceConverted}`];
  }

  async findOne(id: string) {
    const res = await axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `
          query($id: [ID!]){
            queryRoot(filter: {id: $id}) {
                id
                name
            }
          }
        `,
        variables: { id },
      },
    });
    return res.data.data.queryRoot;
  }

  async update(id: string, updateRootDto: UpdateRootDto) {
    const { name } = updateRootDto;
    const res = await axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `
          mutation ($name: String!, $id: [ID!]){
            updateRoot(input: {filter:{id: $id}, set: {name: $name}}) {
              root {
                id
                name
              }
            }
          }
        `,
        variables: { name, id },
      },
    });

    return res.data.data.updateRoot;
  }

  async remove(id: string) {
    const res = await axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `
          mutation ($id: [ID!]){
            deleteRoot(filter: {id: $id}) {
              root {
                id
                name
              }
            }
          }
        `,
        variables: { id },
      },
    });

    return res.data.data.deleteRoot;
  }

  async tree() {
    const res = await axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `
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
        `,
      },
    });
    return res.data.data.queryUser;
  }

  static convertFirstLetter(resource: string): string {
    const convertToUpperCase = resource.slice(0, 1).toLocaleUpperCase();
    return convertToUpperCase + resource.slice(1, resource.length);
  }
}
