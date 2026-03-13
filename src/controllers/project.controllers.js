import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
} from "../utils/mail.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UserRolesEnum } from "../utils/constants.js";

//this route is responsible for getting all the project here as well
const getProjects = asyncHandler(async (req, res) => {
  const projects = await ProjectMember.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "projects",
        localFields: "projects",
        foreignField: "_id",
        as: "projects",
        pipeline: [
          {
            $lookup: {
              from: "projectMembers",
              localField: "_id",
              foreignField: "projects",
              as: "projectmembers",
            },
          },
          {
            $addFields: {
              members: {
                $size: "$projectmembers",
              },
            },
          },
          {
            $unwind: "$project",
          },
          {
            $project: {
              project: {
                _id: 1,
                name: 1,
                description: 1,
                members: 1,
                createdAt: 1,
                createdBy: 1,
              },

              role: 1,
              _id: 0,
            },
          },
        ],
      },
    },
  ]);
  return res.status(201).json(
    new ApiResponse(
      201, 
      projects,
      "Projects fetche succesfully"
    )
  )
});

//get project details by id
const getProjectById = asyncHandler(async (req, res) => {});

//to create project
const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const project = await Project.create({
    name,
    description,
    createdBy: new mongoose.Types.ObjectId(req.user._id),
  });

  await ProjectMember.create({
    user: new mongoose.Types.ObjectId(req.user._id),
    project: new mongoose.Types.ObjectId(project._id),
    role: UserRolesEnum.ADMIN,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, project, "project created succesfully"));
});

//to update project
const updateProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { projectId } = req.params;

  const project = await Project.findByIdAndUpdate(
    projectId,
    {
      name,
      description,
    },
    {
      new: true,
    },
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project updated successfully"));
});

//delete project
const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findByIdAndDelete(projectId);

  if (!project) {
    throw new ApiError(404, "project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "project deleted succesfully"));
});

//adding memmebers to project
const addMembersToProject = asyncHandler(async (req, res) => {});

//to get project members
const getprojectMembers = asyncHandler(async (req, res) => {});

//to update the member role
const updateMemberRole = asyncHandler(async (req, res) => {});

//to delete member role
const deleteMember = asyncHandler(async (req, res) => {});

export {
  getProjects,
  getProjectById,
  getprojectMembers,
  createProject,
  updateMemberRole,
  updateProject,
  deleteMember,
  deleteProject,
  addMembersToProject,
};
