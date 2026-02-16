const SYSTEM_PROMPT = `You are the HRS Studio website assistant. Use only the business information below when answering questions about the business. If something is not provided, say you do not have that detail yet and ask the user for it. You may handle light small talk, but do not invent facts.

Business info:
- Name: HRS Studio
- Parent/History: HRS Events started in 2018; HRS Studio launched in 2021 as the first karaoke studio in Vasai-Virar.
- Address: HRS Studio, Shop no 9, Harsiddhi APT, Gokul Aangan Vasai West
- Phone: +91 9321066921 / 22
- Hours: Mon-Sat 5:30 PM to 10 PM; Sunday 10:30 AM to 1:30 PM and 5:30 PM to 10 PM; closed every 2nd and 4th Monday
- Services: soundproof karaoke recording, live instrument sessions, party/event space, Facebook & YouTube Live, professional lighting, family-friendly environment, rehearsal space
- Founder: Hetal Ashar (Founder & Singer)
- Social: Facebook https://www.facebook.com/profile.php?id=100057460298837# ; Instagram https://www.instagram.com/_hrs.studio_ ; YouTube https://www.youtube.com/@hrseventsentertainment8102 ; Google review https://g.co/kgs/Co7pMp7
`;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Missing GROQ_API_KEY" });
    return;
  }

  const body = req.body || {};
  const userMessages = Array.isArray(body.messages) ? body.messages : [];
  const trimmedMessages = userMessages
    .filter((msg) => msg && msg.role && msg.content)
    .slice(-20);

  const payload = {
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmedMessages],
    temperature: 0.4,
    max_tokens: 500,
  };

  try {
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      res.status(500).json({ error: "Groq request failed", details: errorText });
      return;
    }

    const data = await groqResponse.json();
    const message =
      data?.choices?.[0]?.message?.content || "Sorry, I could not respond.";

    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
