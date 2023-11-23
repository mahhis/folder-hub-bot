import { Ref, getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { User } from '@/models/User'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Url {
  @prop({ index: true, ref: () => User })
  user?: Ref<User>
  @prop({ required: true })
  value!: string
}

export const UrlModel = getModelForClass(Url)

export function findOrCreateUrl(value: string) {
  return UrlModel.findOneAndUpdate(
    { value },
    {},
    {
      upsert: true,
      new: true,
    }
  )
}
