// import { put } from "@vercel/blob";
// import { NextResponse } from "next/server";

// export async function handle(req, res) {
//   const { searchParams } = new URL(req.url);
//   const filename = searchParams.get("filename");

//   if (!filename) {
//     return res.status(400).json({ error: "Filename is required" });
//   }

//   const blob = await put(filename, req.body, {
//     access: "public",
//   });

//   res.status(200).json(blob);
// }
