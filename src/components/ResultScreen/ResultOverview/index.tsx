import { FC } from "react";
import styled from "styled-components";
import { useQuiz } from "../../../context/QuizContext";
import { device } from "../../../styles/BreakPoints";
import { HighlightedText } from "../../../styles/Global";
import { convertSeconds } from "../../../utils/helpers";
import { Result } from "../../../types";
import jsPDF from "jspdf";
import baseUrl from "../../../utils/baseUrl"; // Corrected import path

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

  const handleDownloadCertificate = () => {
    const pdf = new jsPDF("l", "pt", "a4");

    pdf.setFontSize(24);
    pdf.text("Certificate of Completion", 200, 150);

    pdf.setFontSize(18);
    pdf.text(`This certificate is awarded to: ${userData.name}`, 50, 180);
    pdf.text("For successfully completing the", 50, 210);
    pdf.text("The Lube Buzz Quiz 2024", 50, 240);

    pdf.setFontSize(14);
    pdf.text(`Score: ${obtainedScore} / ${quizDetails.totalScore}`, 50, 270);
    pdf.text(
      `Status: ${calculateStatus}`,
      50,
      300
    );
    pdf.text(
      `Date: ${new Date(userData.quizCompletionDate).toLocaleDateString()}`,
      50,
      330
    );

    pdf.save(`${userData.name}_certificate.pdf`);
  };

  const handleShareOnLinkedIn = () => {
    const quizTitle = "The Lube Buzz Quiz 2024";
    const linkedInShareURL = `https://www.linkedin.com/oauth/v2/authorization?client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${baseUrl}/api/linkedin/generate-accesstoken&response_type=code&scope=r_liteprofile%20r_emailaddress%20w_member_social`;

    window.open(linkedInShareURL, "_blank");
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
