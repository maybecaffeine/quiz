import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const certificatesDir = path.join(__dirname, "certificates");

// Ensure the certificates directory exists
if (!fs.existsSync(certificatesDir)) {
  fs.mkdirSync(certificatesDir);
}

// Certificate Download Endpoint
app.get("/api/download", async (req: Request, res: Response) => {
  const { name, percent } = req.query;

  if (!name || !percent) {
    return res.status(400).json({ error: "Name and percent are required." });
  }

  try {
    // Generate the certificate
    const doc = new jsPDF("landscape");
    doc.setFontSize(24);
    doc.text("Certificate of Completion", 40, 50);
    doc.setFontSize(18);
    doc.text(`Awarded to: ${name}`, 40, 70);
    doc.text(`Score: ${percent}%`, 40, 90);

    // Save the PDF
    const filePath = path.join(certificatesDir, `${name}_certificate.pdf`);
    const pdfContent = doc.output();
    fs.writeFileSync(filePath, pdfContent, "binary");

    // Serve the file URL
    res.json({ fileUrl: `/certificates/${name}_certificate.pdf` });
  } catch (error) {
    console.error("Error generating certificate:", error);
    res.status(500).json({ error: "Failed to generate certificate." });
  }
});

// Serve the certificates folder
app.use("/certificates", express.static(certificatesDir));

// LinkedIn Share Endpoint
app.post("/api/linkedin/share", async (req: Request, res: Response) => {
  const { accessToken, message } = req.body;

  if (!accessToken || !message) {
    return res.status(400).json({ error: "Access token and message are required." });
  }

  try {
    const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: "urn:li:person:your-linkedin-user-id", // Replace with your LinkedIn user ID
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: { text: message },
            shareMediaCategory: "NONE",
          },
        },
        visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
      }),
    });

    if (response.ok) {
      res.status(200).json({ message: "Successfully shared on LinkedIn!" });
    } else {
      const error = await response.json();
      res.status(response.status).json({ error: error.message || "LinkedIn share failed." });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error sharing on LinkedIn:", error.message);
    } else {
      console.error("An unknown error occurred.");
    }
    res.status(500).json({ error: "An error occurred while sharing on LinkedIn." });
  }
});

// Quiz Results Endpoint (Placeholder for Database Integration)
app.get("/api/quiz-results", (req: Request, res: Response) => {
  const sampleResults = [
    { question: "Question 1", score: 10, isMatch: true },
    { question: "Question 2", score: 0, isMatch: false },
  ];
  res.json(sampleResults);
});

// Quiz Retry Endpoint (Optional)
app.post("/api/quiz-retry", (req: Request, res: Response) => {
  res.json({ message: "Retry initialized. Redirecting to quiz page." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
