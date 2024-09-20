import React, { useState } from "react";
import PdfToText from "react-pdftotext";
// Preprocess text by lowercasing and removing punctuation

const ResumeJobDescriptionScanner = () => {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [similarityScore, setSimilarityScore] = useState("0.00");
  const preprocessText = (text) => {
    return text.toLowerCase().replace(/[^\w\s]/g, "");
  };

  // Basic tokenizer splitting by whitespace
  const tokenize = (text) => {
    return preprocessText(text).split(/\s+/);
  };

  // Term Frequency (TF)
  const termFrequency = (term, documentTokens) => {
    let count = 0;
    documentTokens.forEach((token) => {
      if (token.includes(term)) count++;
    });
    return count / documentTokens.length;
  };

  // Document Frequency (DF)
  const documentFrequency = (term, documents) => {
    let count = 0;
    documents.forEach((documentTokens) => {
      if (documentTokens.includes(term)) count++;
    });
    return count;
  };

  // Calculate TF-IDF for a term
  const calculateTFIDF = (term, documentTokens, allDocuments) => {
    const tf = termFrequency(term, documentTokens);
    const df = documentFrequency(term, allDocuments);
    const idf = Math.log(allDocuments.length / (1 + df)); // Avoid division by zero
    return tf * idf;
  };

  // Cosine similarity calculation between two vectors
  const calculateCosineSimilarity = (vectorA, vectorB) => {
    const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
    const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  };

  // Create a TF-IDF vector for a document
  const createTFIDFVector = (documentTokens, allDocuments) => {
    const uniqueTerms = [...new Set(documentTokens)];
    return uniqueTerms.map((term) =>
      calculateTFIDF(term, documentTokens, allDocuments)
    );
  };
  const extractText = async () => {
    if (resume) {
      // try {
      const text = await PdfToText(resume);
      // setTextContent(text);
      console.log(text);
      return text;
      // } catch (error) {
      // console.error("Error extracting text:", error);
      // }
    }
  };

  const handleScan = async () => {
    const text = await extractText();
    const resumeTokens = tokenize(text);
    console.log(resumeTokens);
    const jobDescriptionTokens = tokenize(jobDescription);
    console.log(jobDescriptionTokens);

    if (resumeTokens.length === 0 || jobDescriptionTokens.length === 0) {
      setSimilarityScore("0.00");
      return;
    }

    const allDocuments = [resumeTokens, jobDescriptionTokens];
    const resumeVector = createTFIDFVector(resumeTokens, allDocuments);
    const jobDescriptionVector = createTFIDFVector(
      jobDescriptionTokens,
      allDocuments
    );

    const cosineSimilarity = calculateCosineSimilarity(
      resumeVector,
      jobDescriptionVector
    );
    console.log(cosineSimilarity);
    setSimilarityScore((cosineSimilarity * 100).toFixed(2));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setResume(selectedFile);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* <h1>Resume to Job Description Scanner</h1> */}

      <div>
        {/* <h1>PDF Text Extractor</h1> */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        {/* <button onClick={extractText}>Extract Text</button> */}
        {/* <pre>{textContent}</pre> */}
      </div>
      <br />
      <textarea
        rows="10"
        cols="50"
        placeholder="Paste job description here"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <br />
      <button onClick={handleScan}>Scan</button>
      <h2>Match Percentage: {similarityScore}%</h2>
    </div>
  );
};

export default ResumeJobDescriptionScanner;
