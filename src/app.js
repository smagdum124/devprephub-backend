import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";

const app = express();

app.use(cors({
    origin: [
        "https://devprephub.vercel.app"
    ],
    credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "DevPrepHub Backend Running",
    });
});
app.use(
    "/api/questions",
    questionRoutes
);
app.use(
    "/api/blogs",
    blogRoutes
);
app.use(
    "/api/resume-tips",
    resumeRoutes
);
app.use(
    "/api/dashboard",
    dashboardRoutes
);
app.use("/api/contact", contactRoutes);
app.use(
    "/api/newsletter",
    newsletterRoutes
);

export default app;