import { FC } from "react";
import styled from "styled-components";
import { useQuiz } from "../../../context/QuizContext";
import { device } from "../../../styles/BreakPoints";
import { HighlightedText } from "../../../styles/Global";
import { convertSeconds } from "../../../utils/helpers";
import { Result } from "../../../types";

const ResultOverviewStyle = styled.div`
  text-align: center;
  margin-bottom: 70px;
  @media ${device.md} {
    margin-bottom: 30px;
  }
  p {
    margin-top: 15px;
    font-weight: 500;
    font-size: 18px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }

  .btn-green {
    background-color: #28a745;
    transition: background-color 0.3s;
  }

  .btn-green:hover {
    background-color: #218838;
  }

  .btn-blue {
    background-color: #0073b1;
    transition: background-color 0.3s;
  }

  .btn-blue:hover {
    background-color: #005582;
  }

  .btn-red {
    background-color: #dc3545;
    transition: background-color 0.3s;
  }

  .btn-red:hover {
    background-color: #c82333;
  }
`;

interface ResultOverviewProps {
  result: Result[];
  userData: {
    name: string;
    quizCompletionDate: string;
  };
}

const ResultOverview: FC<ResultOverviewProps> = ({ result, userData }) => {
  const { quizDetails, endTime } = useQuiz();

  const totalQuestionAttempted = result.length;

  const obtainedScore = result
    .filter((item) => item.isMatch && typeof item.score === "number")
    .reduce((accumulator, currentValue) => accumulator + (currentValue.score || 0), 0);

  const calculateStatus =
    (obtainedScore / quizDetails.totalScore) * 100 >= 60 ? "Passed" : "Failed";

  const handleDownloadCertificate = async () => {
    try {
      const response = await fetch(`/api/download?name=${userData.name}&percent=${obtainedScore}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to generate certificate.");
      }

      const { fileUrl } = await response.json();
      // Create an invisible link and trigger the download
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = `${userData.name}_certificate.pdf`;
      link.click();
    } catch (error) {
      console.error("Error downloading certificate:", error);
      alert("Failed to download certificate.");
    }
  };

  const handleShareOnLinkedIn = async () => {
    try {
      const response = await fetch("/api/linkedin/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: sessionStorage.getItem("linkedInAccessToken"), // Token should be securely managed
          message: `I just completed The Lube Buzz Quiz 2024! I scored ${obtainedScore}/${quizDetails.totalScore} and achieved the status of ${calculateStatus}. 🎉`,
        }),
      });

      // Check if response is OK
      if (!response.ok) {
        const textResponse = await response.text(); // Read the response as text
        throw new Error(`Error sharing on LinkedIn: ${textResponse}`);
      }

      // Try to parse JSON response if available
      try {
        const data = await response.json();
        alert("Successfully shared on LinkedIn!");
      } catch (jsonError) {
        // If JSON parsing fails, log the error and alert the user
        console.error("Error parsing JSON response:", jsonError);
        alert("Failed to share on LinkedIn. Please try again later.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error sharing on LinkedIn:", error.message);
        alert(`Error sharing on LinkedIn: ${error.message}`);
      } else {
        console.error("An unknown error occurred.");
        alert("An unknown error occurred while sharing on LinkedIn.");
      }
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <ResultOverviewStyle>
      <p>
        You attempted questions:
        <HighlightedText> {totalQuestionAttempted} </HighlightedText> /{" "}
        {quizDetails.totalQuestions}
      </p>
      <p>
        Score secured:
        <HighlightedText> {obtainedScore} </HighlightedText> /{" "}
        {quizDetails.totalScore}
      </p>
      <p>
        Time Spent:
        <HighlightedText> {convertSeconds(endTime)} </HighlightedText>
      </p>
      <p>
        Status:
        <HighlightedText
          style={{
            color:
              calculateStatus === "Failed"
                ? "#dc3545"
                : calculateStatus === "Passed"
                ? "#28a745"
                : "inherit",
          }}
        >
          {calculateStatus}
        </HighlightedText>
      </p>

      <ActionButtons>
        {calculateStatus === "Passed" ? (
          <>
            <button className="btn btn-green" onClick={handleDownloadCertificate}>
              Download My Certificate
            </button>
            <button className="btn btn-blue" onClick={handleShareOnLinkedIn}>
              Share on LinkedIn
            </button>
          </>
        ) : (
          <button className="btn btn-red" onClick={handleRetry}>
            Retry
          </button>
        )}
      </ActionButtons>
    </ResultOverviewStyle>
  );
};

export default ResultOverview;
