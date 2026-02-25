import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

// to avoid too many try catch block we use async await
// const healthcheck = async (req, res, next) => {
//   try {
//     const user = await getuserfromDB();
//     res
//       .status(200)
//       .json(new ApiResponse(200, { message: "Server is running" }));
//   } catch (error) {
//     next(error);
//   }
// };

//second method
const healthcheck = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { message: "server is still  running" }));
});

export { healthcheck };
