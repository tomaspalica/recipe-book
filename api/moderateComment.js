export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // lub konkretny origin np. http://localhost:3000
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // obsługa preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // bardzo ważne! musi zwrócić 200
  }
  console.log("REQ BODY:", req.body);
  console.log("OPENAI_API_KEY:", !!process.env.OPENAI_API_KEY);
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { comment } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        input: comment,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`OpenAI API error ${response.status}: ${errorDetails}`);
    }

    const data = await response.json();

    if (data.results[0].flagged) {
      res
        .status(200)
        .json({ allowed: false, reason: "Komentarz nieodpowiedni" });
    } else {
      res.status(200).json({ allowed: true });
    }
  } catch (error) {
    console.error("OpenAI error:", error);
    res
      .status(500)
      .json({ allowed: false, reason: "Błąd połączenia z OpenAI" });
  }
}
