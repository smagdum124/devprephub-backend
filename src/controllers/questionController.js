import Question from "../models/Question.js";

export const createQuestion = async (
    req,
    res
) => {
    try {
        const {
            title,
            slug,
            category,
            answer,
        } = req.body;

        const existingQuestion =
            await Question.findOne({
                $or: [
                    { slug },
                    { title },
                ],
            });

        if (existingQuestion) {
            return res.status(400).json({
                success: false,
                message:
                    "Question already exists",
            });
        }

        const question =
            await Question.create({
                title,
                slug,
                category,
                answer,
            });

        res.status(201).json({
            success: true,
            message:
                "Question added successfully",
            question,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}; export const getQuestions = async (
    req,
    res
) => {
    try {
        const questions =
            await Question.find().sort({
                createdAt: -1,
            });

        res.json({
            success: true,
            count: questions.length,
            questions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getQuestionBySlug = async (
    req,
    res
) => {
    try {
        const question = await Question.findOne({
            slug: req.params.slug,
        });

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found",
            });
        }

        res.json({
            success: true,
            question,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// for update 
export const updateQuestion = async (
    req,
    res
) => {
    try {
        const question =
            await Question.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            );

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found",
            });
        }

        res.json({
            success: true,
            question,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// for delete
export const deleteQuestion = async (
    req,
    res
) => {
    try {
        const question =
            await Question.findById(
                req.params.id
            );

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found",
            });
        }

        await question.deleteOne();

        res.json({
            success: true,
            message:
                "Question deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
