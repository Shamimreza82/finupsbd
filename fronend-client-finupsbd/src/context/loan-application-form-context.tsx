"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { z } from "zod";

import type { documentInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/document-info-schema";
import type { employmentInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/employment-info-schema";
import type { guarantorInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/guarantor-info-schema";
import type { loanInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/loan-info-schema";
import type { loanRequestSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/loan-request-schema";
import type { personalInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/personal-info-schema";
import type { residentialInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/residential-info-schema";

// Define the form data structure
export type FormData = {
  personalInfo: z.infer<typeof personalInfoSchema> | null;
  residentialInfo: z.infer<typeof residentialInfoSchema> | null;
  employmentInfo: z.infer<typeof employmentInfoSchema> | null;
  loanInfo: z.infer<typeof loanInfoSchema> | null;
  loanRequest: z.infer<typeof loanRequestSchema> | null;
  documentInfo: z.infer<typeof documentInfoSchema> | null;
  guarantorInfo: z.infer<typeof guarantorInfoSchema> | null;
  draftMode: {
    personalInfo: boolean;
    residentialInfo: boolean;
    employmentInfo: boolean;
    loanInfo: boolean;
    loanRequest: boolean;
    documentInfo: boolean;
    guarantorInfo: boolean;
  };
};

// Define the form context type
interface FormContextType {
  formData: FormData;
  updateFormData: (step: keyof Omit<FormData, "draftMode">, data: any) => void;
  resetForm: () => void;
  isStepCompleted: (step: keyof Omit<FormData, "draftMode">) => boolean;
  isFormSubmitted: boolean;
  setIsFormSubmitted: (value: boolean) => void;
  submittedData: FormData | null;
  setSubmittedData: (data: FormData | null) => void;
  isStepEditable: (step: keyof Omit<FormData, "draftMode">) => boolean;
  setAllStepsToNonDraft: () => void;
  enableDocumentEditing: () => void;
  isDataLoaded: boolean; // Add this
}

// Create the form context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Initial form data
const initialFormData: FormData = {
  personalInfo: null,
  residentialInfo: null,
  employmentInfo: null,
  loanInfo: null,
  loanRequest: null,
  documentInfo: null,
  guarantorInfo: null,
  draftMode: {
    personalInfo: true,
    residentialInfo: true,
    employmentInfo: true,
    loanInfo: true,
    loanRequest: true,
    documentInfo: true,
    guarantorInfo: true,
  },
};

// Storage utility functions
const STORAGE_KEY = "loanApplicationForm";
const DOCUMENT_STORAGE_KEY = "loanApplicationDocuments";

// Function to estimate storage size
const getStorageSize = (data: any): number => {
  return new Blob([JSON.stringify(data)]).size;
};

// Function to save data with quota handling
const saveToStorage = (key: string, data: any): boolean => {
  try {
    const dataString = JSON.stringify(data);
    const dataSize = new Blob([dataString]).size;

    // Check if data size is reasonable (less than 4MB to be safe)
    if (dataSize > 4 * 1024 * 1024) {
      console.warn(
        `Data size (${(dataSize / 1024 / 1024).toFixed(2)}MB) is too large for localStorage`,
      );
      return false;
    }

    localStorage.setItem(key, dataString);
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.code === 22) {
      console.error("Storage quota exceeded. Attempting to clear old data...");

      // Try to clear document storage first
      try {
        localStorage.removeItem(DOCUMENT_STORAGE_KEY);
        localStorage.setItem(key, JSON.stringify(data));
        return true;
      } catch (retryError) {
        console.error(
          "Failed to save even after clearing documents:",
          retryError,
        );
        return false;
      }
    }
    console.error("Error saving to localStorage:", error);
    return false;
  }
};

// Function to load data from storage
const loadFromStorage = (key: string): any => {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};

// Function to separate documents from form data
const separateDocuments = (formData: FormData) => {
  const { documentInfo, ...otherData } = formData;
  return { documentInfo, otherData };
};

// Form provider component
export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Load form data from localStorage on initial render
  useEffect(() => {
    const loadData = () => {
      try {
        const savedData = loadFromStorage(STORAGE_KEY);
        const savedDocuments = loadFromStorage(DOCUMENT_STORAGE_KEY);

        if (savedData || savedDocuments) {
          const combinedData = {
            ...initialFormData,
            ...savedData,
            documentInfo: savedDocuments || null,
          };
          setFormData(combinedData);
        }
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error loading form data:", error);
        setIsDataLoaded(true);
      }
    };

    loadData();
  }, []);

  // Update form data for a specific step
  const updateFormData = (
    step: keyof Omit<FormData, "draftMode">,
    data: any,
  ) => {
    const updatedFormData = {
      ...formData,
      [step]: data,
    };
    setFormData(updatedFormData);

    // Separate documents from other data for storage
    const { documentInfo, otherData } = separateDocuments(updatedFormData);

    // Save non-document data
    const mainDataSaved = saveToStorage(STORAGE_KEY, otherData);

    // Save document data separately if it exists
    if (documentInfo && step === "documentInfo") {
      const documentsSaved = saveToStorage(DOCUMENT_STORAGE_KEY, documentInfo);

      if (!documentsSaved) {
        console.warn("Documents could not be saved due to storage limitations");
        // You might want to show a user notification here
      }
    }

    if (!mainDataSaved) {
      console.warn("Form data could not be saved due to storage limitations");
      // You might want to show a user notification here
    }
  };

  // Reset the form data
  const resetForm = () => {
    setFormData(initialFormData);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DOCUMENT_STORAGE_KEY);
    setIsDataLoaded(true);
  };

  // Check if a step is completed
  const isStepCompleted = (step: keyof Omit<FormData, "draftMode">) => {
    return formData[step] !== null;
  };

  // Set all steps to non-draft mode
  const setAllStepsToNonDraft = () => {
    const updatedFormData = {
      ...formData,
      draftMode: {
        personalInfo: false,
        residentialInfo: false,
        employmentInfo: false,
        loanInfo: false,
        loanRequest: false,
        documentInfo: false,
        guarantorInfo: false,
      },
    };
    setFormData(updatedFormData);

    // Save updated data
    const { documentInfo, otherData } = separateDocuments(updatedFormData);
    saveToStorage(STORAGE_KEY, otherData);
  };

  // Enable document editing only
  const enableDocumentEditing = () => {
    const updatedFormData = {
      ...formData,
      draftMode: {
        ...formData.draftMode,
        documentInfo: true,
      },
    };
    setFormData(updatedFormData);

    // Save updated data
    const { documentInfo, otherData } = separateDocuments(updatedFormData);
    saveToStorage(STORAGE_KEY, otherData);
  };

  // Check if a step is editable
  const isStepEditable = (step: keyof Omit<FormData, "draftMode">) => {
    if (!isFormSubmitted) return true;
    return formData.draftMode[step];
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        resetForm,
        isStepCompleted,
        isFormSubmitted,
        setIsFormSubmitted,
        submittedData,
        setSubmittedData,
        isStepEditable,
        setAllStepsToNonDraft,
        enableDocumentEditing,
        isDataLoaded, // Add this to the context
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

// Custom hook to use the form context
export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
