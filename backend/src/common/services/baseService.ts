import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common'
import {Document, Model, Query, UpdateQuery} from "mongoose"

import logger from '../../utils/logger'

@Injectable()
export class BaseService<T extends Document> {
  constructor(private readonly model: Model<T>) {
  }

  async getOne(filter: Record<string, any>, fields?: string[]): Promise<T> {
    let query = this.model.findOne(filter)
    if (fields && fields.length > 0) {
      query = query.select(fields.join(' '))
    }
    logger.debug("query: " +query)
    const obj = await query.exec()
    if (!obj) {
      throw new NotFoundException(`${this.model.modelName} not found`)
    }
    return obj
  }

  async getOneOrNull(filter: Record<string, any>, fields?: string[]): Promise<T | null> {
    try {
      return await this.getOne(filter, fields)
    } catch (err) {
      if (err instanceof NotFoundException) {
        return null
      }
      throw err
    }
  }

  async update(filter: Record<string, any>, data: UpdateQuery<T>): Promise<T> {
    const obj = await this.getOne(filter)
    Object.assign(obj, data)
    return obj.save()
  }

  async findOneAndUpdate(filter: Record<string, any>, data: UpdateQuery<T>): Promise<T | null> {
    const options = {new: true}
    return this.model.findOneAndUpdate(filter, data, options).exec()
  }

  async create(newObjects: Partial<T> | Partial<T>[]): Promise<T> {
    logger.debug("Creating record for model xxx, json: " + JSON.stringify(newObjects))
    return await this.model.create(newObjects)
  }

  async getOneAndAuthorize(
    filter: Record<string, any>,
    fields: string[] | undefined,
    loggedInUserId: string,
    loggedInUserRole: string,
  ): Promise<T> {
    const obj = await this.getOne(filter, fields);

    if (obj._id) {
      if (!obj._id.equals(loggedInUserId) && loggedInUserRole !== 'admin') {
        throw new ForbiddenException(`Insufficient rights to access the ${this.model.modelName}`);
      }
    }
    if (!obj._id.equals(loggedInUserId) && loggedInUserRole !== 'admin') {
      throw new ForbiddenException(`Insufficient rights to access the ${this.model.modelName}`);
    }
    return obj
  }

  async updateAndAuthorize(
    filter: Record<string, any>,
    data: UpdateQuery<T>,
    loggedInUserId: string | undefined,
    loggedInUserRole: string | undefined,
  ): Promise<T> {
    console.log('Filter passing inside of updateAndAuthorize=', filter)
    console.log('Data passing inside of updateAndAuthorize=', data)
    console.log('loggedInUserId passing inside of updateAndAuthorize=', loggedInUserId)
    console.log('loggedInUserRole passing inside of updateAndAuthorize=', loggedInUserRole)
    const obj = await this.getOneAndAuthorize(filter, undefined, loggedInUserId, loggedInUserRole)
    Object.assign(obj, data)
    return obj.save()
  }

  async delete(
    filter: Record<string, any>
  ): Promise<void> {
    const obj = await this.getOne(filter)
    await obj.deleteOne()
  }

  extendFilterByActiveStatus(filter: Record<string, any>): Record<string, any> {
    filter = filter || {}
    if (!filter.status) {
      filter.status = 'ACTIVE'
    }
    return filter
  }

  async getList(
    filter: Record<string, any>,
    fields: string[] | undefined,
    limit: number | undefined,
    skip: number | undefined,
    orderBy: string | undefined,
    lean: boolean | undefined,
    // populateFields: string[] | undefined
  ): Promise<T[]> {
    let query: Query<T[], T> = this.model.find(filter).lean()
    // if (populateFields && populateFields.length > 0) {
    //     if (populateFields.includes('user')) {
    //         query = query.populate({
    //             path: 'user',
    //             select: 'name surname'
    //         });
    //     }
    // }

    // if (fields && fields.length > 0) {
    //     query = query.select(fields.join(' '))
    // }
    //
    if (limit) {
      query = query.limit(limit)
    }
    if (skip) {
      query = query.skip(skip)
    }
    if (orderBy) {
        query = query.sort(orderBy)
    }
    //
    // if (lean) {
    //     query = query.lean()
    // }

    const results = await query.exec()
    //
    // let results = null
    return results
  }

  async getListCount(filter: Record<string, any>): Promise<number> {
    return this.model.countDocuments(filter)
  }
}