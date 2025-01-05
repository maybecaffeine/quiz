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
`;

interface ResultOverviewProps {
  result: Result[];
}

const ResultOverview: FC<ResultOverviewProps> = ({ result }) => {
  const { quizDetails, endTime } = useQuiz();

  const totalQuestionAttempted = result.length;

  const obtainedScore = result
    .filter((item) => item.isMatch && typeof item.score === "number")
    .reduce((accumulator, currentValue) => accumulator + (currentValue.score || 0), 0);

  const calculateStatus =
    (obtainedScore / quizDetails.totalScore) * 100 >= 60 ? "Passed" : "Failed";

  // Handles certificate download
  const handleDownloadCertificate = () => {
    const certificateURL = "/path-to-certificate/certificate.pdf"; // Replace with the actual URL
    const link = document.createElement("a");
    link.href = certificateURL;
    link.download = "Certificate.pdf";
    link.click();
  };

  // Handles LinkedIn sharing
  const handleShareOnLinkedIn = () => {
    const quizURL = "https://example.com/quiz"; // Replace with your actual quiz URL
    const quizTitle = "The Lube Buzz Quiz 2024";
    const linkedInShareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      quizURL
    )}&title=${encodeURIComponent(quizTitle)}`;

    window.open(linkedInShareURL, "_blank");
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
        Time Spent:<HighlightedText> {convertSeconds(endTime)} </HighlightedText>
      </p>
      <p>
        Status:<HighlightedText> {calculateStatus}</HighlightedText>
      </p>

      {/* Add buttons for download and sharing */}
      <ActionButtons>
        <button className="btn btn-green" onClick={handleDownloadCertificate}>
          Download My Certificate
        </button>
        <button className="btn btn-blue" onClick={handleShareOnLinkedIn}>
          Share on LinkedIn
        </button>
      </ActionButtons>
    </ResultOverviewStyle>
  );
};

export default ResultOverview;
