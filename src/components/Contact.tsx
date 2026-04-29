import { type FormEvent, useState } from "react";
import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";
import { contact } from "../data/content";
import { useTranslation } from "../i18n";
import { contactFormSchema } from "../lib/validations/contact";
import type { ContactFormResponse } from "../lib/types/contact";

const Section = styled.section`
  padding: ${spacing.sectionPadding} 1.5rem;
  background-color: ${colors.bgSecondary};
`;

const Container = styled.div`
  max-width: ${spacing.containerMax};
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.heading};
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${colors.textPrimary};

  ${media.md} {
    font-size: 2.5rem;
  }
`;

const IntroText = styled.p`
  text-align: center;
  color: ${colors.textSecondary};
  font-size: 1rem;
  margin-bottom: 2.5rem;
  line-height: 1.8;
`;

const FormWrapper = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: ${fonts.body};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RequiredTag = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${colors.accent};
  background: ${colors.accentSubtle};
  padding: 0.1rem 0.4rem;
  border-radius: 0.25rem;
`;

const inputStyles = `
  background-color: ${colors.bgCard};
  border: 1px solid ${colors.border};
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-family: ${fonts.body};
  font-size: 1rem;
  color: ${colors.textPrimary};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;

  &::placeholder {
    color: ${colors.textMuted};
  }

  &:focus {
    border-color: ${colors.accent};
    box-shadow: 0 0 0 2px ${colors.accentSubtle};
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const Textarea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  min-height: 120px;
`;

const ErrorText = styled.p`
  font-size: 0.8rem;
  color: ${colors.accent};
`;

const MessageBox = styled.div<{ $success: boolean }>`
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.6;
  border: 1px solid
    ${({ $success }) => ($success ? colors.success : colors.accent)};
  background: ${({ $success }) =>
    $success ? "rgba(52, 199, 89, 0.08)" : colors.accentSubtle};
  color: ${({ $success }) =>
    $success ? colors.success : colors.accent};
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-family: ${fonts.body};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${colors.accent};
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background-color: ${colors.accentHover};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const HoneypotField = styled.input`
  position: absolute;
  left: -9999px;
  opacity: 0;
`;

type Status = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  name?: string[];
  email?: string[];
  message?: string[];
}

export default function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors(null);
    setResponseMessage(null);

    const parsed = contactFormSchema.safeParse({ name, email, message });
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name,
        email: fieldErrors.email,
        message: fieldErrors.message,
      });
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      const data: ContactFormResponse = await res.json();

      if (data.success) {
        setStatus("success");
        setResponseMessage(data.message);
        setName("");
        setEmail("");
        setMessage("");
        setWebsite("");
      } else if (data.errors) {
        setStatus("idle");
        setErrors(data.errors);
        setResponseMessage(data.message);
      } else {
        setStatus("error");
        setResponseMessage(data.message);
      }
    } catch {
      setStatus("error");
      setResponseMessage(t(contact.error));
    }
  }

  return (
    <Section id="contact">
      <Container>
        <SectionTitle>{t(contact.title)}</SectionTitle>
        <IntroText>{t(contact.description)}</IntroText>

        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <HoneypotField
              type="text"
              name="website"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />

            <FieldGroup>
              <Label htmlFor="contact-name">
                {t(contact.fields.name)}
                <RequiredTag>{t(contact.required)}</RequiredTag>
              </Label>
              <Input
                id="contact-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors?.name && (
                <ErrorText>{t(errors.name[0])}</ErrorText>
              )}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="contact-email">
                {t(contact.fields.email)}
                <RequiredTag>{t(contact.required)}</RequiredTag>
              </Label>
              <Input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors?.email && (
                <ErrorText>{t(errors.email[0])}</ErrorText>
              )}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="contact-message">
                {t(contact.fields.message)}
                <RequiredTag>{t(contact.required)}</RequiredTag>
              </Label>
              <Textarea
                id="contact-message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {errors?.message && (
                <ErrorText>{t(errors.message[0])}</ErrorText>
              )}
            </FieldGroup>

            {responseMessage && !errors && (
              <MessageBox $success={status === "success"}>
                {responseMessage.split("\n").map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </MessageBox>
            )}

            <SubmitButton type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? t(contact.submitting) : t(contact.submit)}
            </SubmitButton>
          </Form>
        </FormWrapper>
      </Container>
    </Section>
  );
}
