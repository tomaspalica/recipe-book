export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { comment } = req.body;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-type": "aplication/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        message: [
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

    const data = await response.json();
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
