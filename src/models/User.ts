import { ObjectId } from 'mongodb'
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: { timestamps: true },
})
export class User {
  @prop({ required: true, index: true, unique: true })
  id!: number
  @prop({})
  username!: string
  @prop({ required: true, default: 'en' })
  language!: string
  @prop({ required: true, default: 'start' })
  step!: string
  @prop({ required: true, default: 3 })
  trialCount!: number
  @prop({ type: () => ObjectId })
  receivedUrlsID?: ObjectId[]
  @prop({ required: true, default: [], type: () => [String] })
  currentCategorySelection!: string[]
}

export const UserModel = getModelForClass(User)

export function findOrCreateUser(id: number, username: string | undefined) {
  return UserModel.findOneAndUpdate(
    { id, username },
    {},
    {
      upsert: true,
      new: true,
    }
  )
}
