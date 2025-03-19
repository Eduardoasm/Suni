import slugs from 'slugs';
import m2s from 'mongoose-to-swagger';
import { hash } from 'argon2';
import { Schema, Document, Types, Model, model, models } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { IPermission, permissionSchema } from '../permissions';
import { ISession, sessionSchema } from '../sessions';
// eslint-disable-next-line import/no-cycle

export type UserRoleEnum = 'admin' | 'superadmin' | 'user';

export type DniTypeEnum = 'V' | 'E' | 'J' | 'G' | 'P' | 'N/A';

export interface IUser {
  _id?: any;
  slug?: string; // TODO: favoritos y user string wau
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  permission: Array<IPermission>;
  userRole: UserRoleEnum;
  emailVerify?: boolean;
  resetTokenValidity?: Date;
  username?: string;
  resetToken?: string;
  dni?: string;
  dniType?: DniTypeEnum;
  sessions?: Array<ISession>;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserDocument = Document<Types.ObjectId, any, IUser> & IUser;

const userSchema = new Schema<IUser>(
  {
    slug: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Por favor ingrese un correo electrónico'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Por favor ingrese una contraseña'],
    },
    firstName: {
      type: String,
      required: [true, 'Por favor ingrese un nombre'],
      trim: true,
    },
    lastName: {
      type: String,
      // required: [true, 'Por favor ingrese un apellido'],
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    permission: [permissionSchema],
    userRole: {
      type: String,
      enum: ['client', 'admin', 'superadmin', 'user'],
    },
    emailVerify: {
      type: Boolean,
      default: false,
    },
    resetTokenValidity: {
      type: Date,
    },
    resetToken: {
      type: String,
    },
    dni: {
      type: String,
      trim: true,
    },
    dniType: {
      type: String,
      enum: ['V', 'E', 'J', 'G', 'P', 'N/A'],
    },
    sessions: [sessionSchema],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('firstName') || !this.isModified('lastName')) {
    return next();
  }
  this.slug = slugs(`${this.firstName} ${this.lastName}`);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`);
  const withSlugs = await (this as any).constructor.find({
    slug: slugRegEx,
  });
  if ((withSlugs as Array<UserDocument>).length) {
    this.slug = `${this.slug}-${withSlugs.length + 1}`;
  }
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = (await hash(this.password, {})).toString();
  next();
});

export const User =
  (models.User as Model<UserDocument>) ||
  model<UserDocument, Model<UserDocument>>('User', userSchema);

// User.SyncToAlgolia();

// User.SetAlgoliaSettings({
//   searchableAttributes: ['firstname', 'email', 'lastname'],
// });

export const UserTC = composeMongoose<UserDocument>(User as any);

export const UserSwagger = m2s(User);
