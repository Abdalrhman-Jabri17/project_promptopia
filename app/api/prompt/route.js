import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"
export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const q = searchParams.get('q');
        await connectToDB();
        let prompts = [];
        if (q) {
            prompts = await Prompt.find({
                $or: [
                    { tag: { $regex: q, $options: 'i' } },
                    { prompt: { $regex: q, $options: "i" } },
                ]
            }).populate("creator");
        } else {
            prompts = await Prompt.find({}).populate("creator");
        }
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}