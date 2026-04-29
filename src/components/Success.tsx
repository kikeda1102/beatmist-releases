import { useState, useEffect } from "react";
import styled from "styled-components";
import { colors, fonts, media } from "../styles/theme";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background-color: ${colors.bgPrimary};
`;

const Card = styled.div`
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 1rem;
  padding: 2.5rem;
  max-width: 520px;
  width: 100%;
  text-align: center;
`;

const Logo = styled.h1`
  font-family: ${fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-family: ${fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 0.5rem;

  ${media.md} {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${colors.textSecondary};
  margin-bottom: 2rem;
`;

const KeyLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.textSecondary};
  margin-bottom: 0.5rem;
  text-align: left;
`;

const KeyBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.border};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const KeyText = styled.code`
  flex: 1;
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  letter-spacing: 0.05em;
  word-break: break-all;
  text-align: left;
`;

const CopyButton = styled.button`
  background: transparent;
  border: 1px solid ${colors.border};
  border-radius: 0.375rem;
  color: ${colors.textSecondary};
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    border-color: ${colors.borderHover};
    color: ${colors.textPrimary};
  }
`;

const Warning = styled.p`
  font-size: 0.8125rem;
  color: ${colors.accent};
  margin-bottom: 2rem;
  text-align: left;
`;

const Steps = styled.ol`
  text-align: left;
  font-size: 0.875rem;
  color: ${colors.textSecondary};
  margin-bottom: 2rem;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const HomeLink = styled.a`
  font-size: 0.875rem;
  color: ${colors.textMuted};
  text-decoration: none;

  &:hover {
    color: ${colors.textPrimary};
  }
`;

const StatusText = styled.p`
  font-size: 1rem;
  color: ${colors.textSecondary};
  padding: 2rem 0;
`;

const ErrorText = styled.p`
  font-size: 1rem;
  color: ${colors.accent};
  padding: 2rem 0;
`;

const ErrorDetail = styled.p`
  font-size: 0.875rem;
  color: ${colors.textMuted};
  margin-top: 1rem;
`;

interface LicenseResponse {
  licenseKey?: string;
  error?: string;
}

export default function Success() {
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setError("Invalid session");
      setLoading(false);
      return;
    }

    fetch(`/api/license?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json() as Promise<LicenseResponse>)
      .then((data) => {
        if (data.licenseKey) {
          setLicenseKey(data.licenseKey);
        } else {
          setError(data.error ?? "Failed to retrieve license key");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Network error");
        setLoading(false);
      });
  }, []);

  const handleCopy = () => {
    if (!licenseKey) return;
    navigator.clipboard.writeText(licenseKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Page>
      <Card>
        <Logo>BeatMist</Logo>

        {loading && <StatusText>Loading...</StatusText>}

        {error && (
          <>
            <ErrorText>An error occurred</ErrorText>
            <ErrorDetail>{error}</ErrorDetail>
            <HomeLink href="/" style={{ display: "block", marginTop: "2rem" }}>
              &larr; Back to Home
            </HomeLink>
          </>
        )}

        {licenseKey && (
          <>
            <Title>Purchase Complete!</Title>
            <Subtitle>Thank you for purchasing BeatMist Pro.</Subtitle>

            <KeyLabel>Your License Key</KeyLabel>
            <KeyBox>
              <KeyText>{licenseKey}</KeyText>
              <CopyButton onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </CopyButton>
            </KeyBox>
            <Warning>
              Please save this key. You will need it to activate BeatMist Pro.
            </Warning>

            <Steps>
              <li>Download and install BeatMist</li>
              <li>Open Settings &rarr; License</li>
              <li>Paste your key and click Activate</li>
            </Steps>

            <HomeLink href="/">&larr; Back to Home</HomeLink>
          </>
        )}
      </Card>
    </Page>
  );
}
