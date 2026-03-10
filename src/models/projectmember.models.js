import mongoose, { Mongoose, Schema } from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

//projectmember belongs to both user and project, so we should
//link it to both user schema and project schema
const projectMemberSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    role: {
      type: String,
      enum: AvailableUserRole,
      default: UserRolesEnum.MEMBER,
    },
  },
  { timestamps: true },
);

export const ProjectMember = Mongoose.model(
  "ProjectMember",
  projectMemberSchema,
);
