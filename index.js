const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// ركز هنا.. تأكد إن المفتاح داخل علامات التنصيص ولا تحذف أي قوس
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: req.body.message }],
        });
        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "❌ مشكلة في المفتاح" });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log("========================================");
    console.log("🚀 SERVER IS RUNNING!");
    console.log("🔗 URL: http://localhost:4000");
    console.log("========================================");
});