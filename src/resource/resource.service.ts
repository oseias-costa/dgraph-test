import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { CreateResourceDto } from './dto/create-resource.dto';
import axios from 'axios';

@Injectable()
export class ResourceService {
  async create(createRootDto: CreateResourceDto) {
    const { resourceName, resourceType, resourceParentId } = createRootDto;

    const res = await axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `
          mutation ($name: String!, $type: String!, $parentId: ID!){
            addResource(input: {name: $name, type: $type, parent: {id: $parentId}}) {
              resource {
                id
                name
              }
            }
          }
        `,
        variables: {
          name: resourceName,
          type: resourceType,
          parentId: resourceParentId,
        },
      },
    });

    if(res.data.errors){
      throw new BadRequestException("Ocorreu um erro ao criar o resource")
    }

    return res.data.data.addResource.resource[0]
  }

  async findResource(id: string) {
    const res = await axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `
          query($id: [ID!]){
            queryResource(filter: {id: $id}) {
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
        `,
        variables: { id },
      },
    });

    if(res.data.errors){
      throw new BadRequestException("Ocorreu um erro")
    }

    return res.data.data.queryResource[0];
  }

  async update(id: string, updateResourceDto: UpdateResourceDto) {
    const { resourceName } = updateResourceDto;
    const res = await axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `
          mutation ($name: String!, $id: [ID!]){
            updateResource(input: {filter:{id: $id}, set: {name: $name}}) {
              resource {
                id
                name
              }
            }
          }
        `,
        variables: { name: resourceName, id },
      },
    });

    if(res.data.errors){
      throw new BadRequestException("Ocorreu um erro ao atualizar o resource")
    }

    return res.data.data.updateResource.resource[0]
  }

  async remove(id: string) {
    const res = await axios({
      url: 'http://localhost:8080/graphql',
      method: 'post',
      data: {
        query: `
          mutation ($id: [ID!]){
            deleteResource(filter: {id: $id}) {
              resource {
                id
                name
              }
            }
          }
        `,
        variables: { id },
      },
    });

    if(res.data.errors){
      throw new BadRequestException("Ocorreu um erro ao remover o resource")
    }

    return res.data.data.deleteResource.resource[0]
  }
}
