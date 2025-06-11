export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // lub konkretny origin
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  console.log("REQ BODY:", req.body);
  console.log("OPENAI_API_KEY:", !!process.env.OPENAI_API_KEY);
  // Obsłuż preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { comment } = req.body;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Jesteś filtrem komentarzy. Oceń, czy komentarz zawiera spam, wulgaryzmy, mowę nienawiści, agresję lub ataki osobiste. Jeśli komentarz jest w porządku, odpowiedz wyłącznie 'OK'. W przeciwnym razie uzasadnij, dlaczego jest nieodpowiedni.",
          },
          { role: "user", content: comment },
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`OpenAI API error ${response.status}: ${errorDetails}`);
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error(
        "response has no 'choices' in OpenAI: " + JSON.stringify(data)
      );
    }
    const result = data.choices[0].message.content.trim();

    if (result.toLowerCase().startsWith("ok")) {
      res.status(200).json({ allowed: true });
    } else {
      res.status(200).json({ allowed: false, reason: result });
    }
  } catch (error) {
    console.error("OpenAI error:", error);
    res
      .status(500)
      .json({ allowed: false, reason: "Błąd połączenia z OpenAi" });
  }
}
