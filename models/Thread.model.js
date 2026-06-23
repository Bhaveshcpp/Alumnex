const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    jobRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobRole",
      required: true,
    },
    yearOfPlacement: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    rounds: [
      {
        type: String,
      },
    ],
    topicsCovered: [
      {
        type: String,
      },
    ],
    experience: {
      type: String,
      required: true,
    },
    candidateName: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Indexes for faster filtering
threadSchema.index({ company: 1 });
threadSchema.index({ jobRole: 1 });
threadSchema.index({ yearOfPlacement: 1 });
threadSchema.index({ experience: "text" });

threadSchema.index(
  { company: 1, jobRole: 1, yearOfPlacement: 1, candidateName: 1 },
  { unique: true, sparse: true }
);

module.exports = mongoose.model("Thread", threadSchema);
