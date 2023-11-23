import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({ required: true, index: true, unique: true })
  id!: number
  @prop({})
  username!: string
  @prop({ required: true, default: 'en' })
  language!: string
  @prop({ required: true, default: 'start' })
  step!: string
}

const UserModel = getModelForClass(User)

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
