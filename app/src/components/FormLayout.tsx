import React from "react";
import type { FormStep } from "@/types";

interface StepIndicatorProps {
  currentStep: FormStep;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  const steps: FormStep[] = ["personal", "employment", "financial", "credit"];
  const currentIndex = steps.indexOf(currentStep);
  const progress =
    currentStep === "result" ? 100 : ((currentIndex + 1) / totalSteps) * 100;

  const stepTitles = {
    personal: "Información Personal",
    employment: "Información Laboral",
    financial: "Información Financiera",
    credit: "Detalles del Crédito",
    result: "Resultado",
  };

  return (
    <div className="mb-6">
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div key={step} className="step-item">
            <div
              className={`step-number ${
                index <= currentIndex ? "is-active" : "is-inactive"
              }`}
            >
              {index + 1}
            </div>
            <span className="step-title has-text-grey">{stepTitles[step]}</span>
          </div>
        ))}
      </div>
      <progress
        className="progress is-bbva is-medium"
        value={progress}
        max="100"
      >
        {progress}%
      </progress>
    </div>
  );
};

interface FormLayoutProps {
  currentStep: FormStep;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  currentStep,
  children,
  title,
  subtitle,
}) => {
  const totalSteps = 4;

  return (
    <section className="hero is-bbva is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half-desktop is-two-thirds-tablet">
              {/* BBVA Header */}

              {currentStep !== "result" && (
                <StepIndicator
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                />
              )}

              <div className="card is-bbva">
                <header className="card-header has-background-bbva">
                  <p className="serif-title card-header-title is-size-2 has-text-white has-text-centered is-justify-content-center">
                    {title}
                  </p>
                </header>
                {subtitle && (
                  <div className="card-header has-background-bbva">
                    <p className="card-header-title has-text-weight-light is-size-6 has-text-white-ter has-text-centered is-justify-content-center">
                      {subtitle}
                    </p>
                  </div>
                )}
                <div className="card-content">
                  <div className="content">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
