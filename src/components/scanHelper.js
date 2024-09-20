// src/scanHelper.js

import natural from "natural";

const preprocessText = (text) => {
  // Implement any preprocessing steps here (e.g., lowercasing, removing punctuation)
  return text.toLowerCase().replace(/[^\w\s]/g, "");
};

const calculateCosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce(
    (sum, val, index) => sum + val * vecB[index],
    0
  );
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

const scanHelper = (resume, jobDescription) => {
  const tokenizer = new natural.WordTokenizer();
  const resumeTokens = tokenizer.tokenize(preprocessText(resume));
  const jobDescriptionTokens = tokenizer.tokenize(
    preprocessText(jobDescription)
  );

  if (resumeTokens.length === 0 || jobDescriptionTokens.length === 0) {
    return "0.00";
  }

  const tfidfVectorizer = new natural.TfIdf();
  tfidfVectorizer.addDocument(resumeTokens.join(" "));
  tfidfVectorizer.addDocument(jobDescriptionTokens.join(" "));

  const resumeVector = tfidfVectorizer.tfidfs(resumeTokens.join(" "));
  const jobDescriptionVector = tfidfVectorizer.tfidfs(
    jobDescriptionTokens.join(" ")
  );

  const cosineSimilarity = calculateCosineSimilarity(
    jobDescriptionVector,
    resumeVector
  );

  return (cosineSimilarity * 100).toFixed(2);
};

export default scanHelper;
